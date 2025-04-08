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
            // 'email' => 'required|string|lowercase|email|max:255|unique:' . Attendee::class,
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
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $transferCheck = TransferTicket::where('transfer_email', $request->email)
            ->where('event_app_id', $eventApp->id)
            ->first();

        if ($transferCheck) {
            $payment = AttendeePurchasedTickets::whereId($transferCheck->attendee_payment_id)->with('purchased_addons')->first();
            if ($payment) {
                $baseTotal = $payment->total;

                $addonsTotal = $payment->purchased_addons->sum('price');

                $finalTotal = $baseTotal + $addonsTotal;

                $recipient = AttendeePayment::findOrFail($payment->attendee_payment_id);
                if ($recipient) {
                    $recipient->update([
                        'sub_total' => $recipient->sub_total - $finalTotal,
                        'amount_paid' => $recipient->sub_total - $finalTotal,
                    ]);
                }

                $transferedTicket = AttendeePayment::create([
                    'uuid' => Str::uuid(),
                    'event_app_id' => $eventApp->id,
                    'attendee_id' => $user->id,
                    'discount_code' => $recipient->discount_code ? $recipient->discount_code : null,
                    'sub_total' => $finalTotal,
                    'discount' => $recipient->discount ? $recipient->discount : null,
                    'amount_paid' => $finalTotal,
                    'stripe_intent' => $recipient->stripe_intent ? $recipient->stripe_intent : null,
                    'status' => $recipient->status ? $recipient->status : null,
                    'payment_method' => $recipient->payment_method ? $recipient->payment_method : null,
                ]);

                AttendeePurchasedTickets::whereId($transferCheck->attendee_payment_id)->update([
                    'attendee_payment_id' => $transferedTicket->id,
                ]);

                $transferCheck->update([
                    'attendee_payment_transfered' => $transferedTicket->id,
                    'transfered' => true,
                ]);
            }
        }

        event(new Registered($user));

        Auth::guard('attendee')->login($user);

        return redirect(route('attendee.event.detail.dashboard'));
    }
}
