<?php

namespace App\Http\Controllers\Attendee\Auth;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\TransferTicket;
use App\Models\AttendeePayment;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use App\Models\AttendeePurchasedTickets;
use App\Models\AttendeeTransferedTicket;
use Illuminate\Support\Facades\DB;
use Nette\Schema\Expect;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(EventApp $eventApp): Response
    {
        return Inertia::render('Attendee/Auth/Register', compact('eventApp'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, EventApp $eventApp): RedirectResponse
    {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('attendees', 'email')->where('event_app_id', $eventApp->id),
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Attendee::create([
            'event_app_id' => $eventApp->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'position' => $request->position,
            'location' => $request->location,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $this->checkIfTicketTransferCase($request->email, $eventApp, $user);

        event(new Registered($user));

        Auth::guard('attendee')->login($user);

        return redirect(route('attendee.event.detail.dashboard'));
    }

    private function checkIfTicketTransferCase($email, $eventApp, $user)
    {
        $transferedTicket = AttendeeTransferedTicket::where('email', $email)
            ->where('event_app_id', $eventApp->id)
            ->first();

        if ($transferedTicket) {
            $purchasedTicket = AttendeePurchasedTickets::whereId($transferedTicket->attendee_purchased_ticket_id)->first();
            $bt_payment = $purchasedTicket->payment;

            if ($purchasedTicket) {
                DB::beginTransaction();
                try {
                    // Update Original Payment values
                    $bt_payment->update([
                        'sub_total' => $bt_payment->sub_total - $purchasedTicket->total,
                        'amount_paid' => $bt_payment->sub_total - $purchasedTicket->total,
                    ]);
                    $bt_payment->save();
                    //Create new Paymnet values
                    $newattendeePayment = AttendeePayment::create([
                    'uuid' => Str::uuid(),
                    'event_app_id' => $eventApp->id,
                    'attendee_id' => $user->id,
                        'discount_code' => null,
                        'sub_total' => $purchasedTicket->total,
                        'discount' => 0,
                        'amount_paid' => $purchasedTicket->total,
                        'stripe_intent' => $transferedTicket->stripe_intent,
                        'status' => $bt_payment->status,
                        'payment_method' => $bt_payment->payment_method,
                ]);

                    //Session Access Needed
                    $purchasedTicket->update([
                        'attendee_payment_id' => $newattendeePayment->id,
                    ]);

                    $transferedTicket->update([
                        'at_attendee_id' => $user->id,
                        'at_attendee_payment_id' => $newattendeePayment->id,
                        'transfer_status' => 'done',
                ]);

                    // update sessions of newly created attendee
                    $this->updateAttendeeSession($newattendeePayment, $user);

                    //update sessions of previous attendee who transfered this ticket
                    $bt_attendee = Attendee::find($transferedTicket->bt_attendee_id);
                    if ($bt_attendee) {

                        $this->updateAttendeeSession($bt_payment, $bt_attendee);
                    }

                    DB::commit();
                } catch (\Exception $ex) {
                    DB::rollBack();
                    Log::error($ex->getMessage());
                }
            }
        }
    }

    private function updateAttendeeSession($payment, $user)
    {

        $payment->load('purchased_tickets.ticket.sessions');
        $sessions = $payment->purchased_tickets->flatMap(function ($item) {
            return $item->ticket->sessions;
        });
        $sessions_ids = $sessions->pluck('id');
        try {
            $user->eventSelectedSessions()->sync($sessions_ids);
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
        }

        // foreach ($payment->purchased_tickets as $purchasedTicket) {
        //     $session_ids = $purchasedTicket->ticket->sessions()->pluck('id');
        //     foreach ($session_ids as $id) {
        //         // Session might be already attached to attendee from any other ticket
        //         try {
        //             $user->eventSelectedSessions()->attach($id);
        //         } catch (\Exception $ex) {
        //             Log::error($ex->getMessage());
        //         }
        //     }
        // }
    }
}
