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
        $eventApp->load(['dates']);
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

            if ($purchasedTicket) {
                DB::beginTransaction();
                try {
                    //Session Access Needed
                    $purchasedTicket->update([
                        'transfered_to_attendee_id' => $user->id,
                        'is_transfered' => true,
                    ]);

                    $transferedTicket->update([
                        'at_attendee_id' => $user->id,
                        'at_attendee_payment_id' => null,
                        'transfer_status' => 'done',
                    ]);

                    // // update sessions of previous attendee who transfered this ticket
                    $bt_attendee = Attendee::find($transferedTicket->bt_attendee_id);
                    $purchasedTickets = $bt_attendee->purchased_tickets();


                    foreach ($purchasedTickets as $purchasedTicketNew) {
                        DB::table('attendee_event_session')->where('attendee_id', $bt_attendee->id)
                            ->where('attendee_purchased_ticket_id', $purchasedTicketNew->id)->delete();
                        $this->updateAttendeeSession($bt_attendee, $purchasedTicketNew);
                    }


                    // update sessions of newly created attendee
                    DB::table('attendee_event_session')->where('attendee_purchased_ticket_id', $purchasedTicket->id)->delete();
                    $this->updateAttendeeSession($user, $purchasedTicket);

                    DB::commit();
                } catch (\Exception $ex) {
                    DB::rollBack();
                    Log::error($ex->getMessage());
                }
            }
        }
    }

    private function updateAttendeeSession($user, $purchasedTicket)
    {
        //Delete all sessions from table of said attendee

        $sessions = $purchasedTicket->ticket->sessions;
        $ids = $sessions->pluck('id');
        Log::info($ids);
        //Recreate all sessions for current urchased tickets
        foreach ($ids as $id) {
            $data = [
                'attendee_id' => $user->id,
                'event_session_id' => $id,
                'attendee_purchased_ticket_id' => $purchasedTicket->id
            ];
            Log::info($data);
            DB::table('attendee_event_session')->insert($data);
        }
    }
}
