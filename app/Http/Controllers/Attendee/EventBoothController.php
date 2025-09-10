<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Mail\EventSponsorshipAwardedMail;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventBooth;
use App\Models\OrganizerPaymentKeys;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EventBoothController extends Controller
{
    protected StripeService $stripe_service;

    public function __construct(StripeService $stripeService)
    {
        $this->stripe_service = $stripeService;
    }

    public function index()
    {
        $attendee  = Auth::user();
        $eventApp  = EventApp::findOrFail($attendee->event_app_id);

        // All booths in this event (for the marketplace grid)
        $booths = EventBooth::where('event_app_id', $attendee->event_app_id)
            ->orderBy('number')
            ->get();

        // ✅ All booths owned by this attendee
        $myBooths = EventBooth::where('event_app_id', $attendee->event_app_id)
            ->where('attendee_id', $attendee->id)
            ->orderBy('number')
            ->get();

        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        return Inertia::render('Attendee/EventBooth/Index', [
            'booths'      => $booths,
            'myBooths'    => $myBooths,
            'getCurrency' => $getCurrency,
        ]);
    }


    public function checkoutPage(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) abort(404);
        if ($booth->status !== 'available') {
            return redirect()->route('attendee.event.booths')->withError('This booth is not available.');
        }

        $eventApp    = EventApp::findOrFail($attendee->event_app_id);
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);
        $currency    = $getCurrency['currency'];

        // Stripe keys (publishable, etc.)
        $stripeKeys  = $this->stripe_service->StripKeys($booth->event_app_id);

        // Create PaymentIntent (amount in major units; if your service expects minor units, convert inside it)
        $pi = $this->stripe_service->createPaymentIntent(
            $booth->event_app_id,
            (float)($booth->price ?? 0),
            $currency
        );

        // IMPORTANT: "payment" must match your product shape (has stripe_intent + total_amount)
        $payment = [
            'id'            => $booth->id,               // we reuse "id" as the resource id
            'total_amount'  => $booth->price,            // for button text
            'stripe_intent' => $pi['client_secret'],     // client secret for PaymentElement
        ];

        $stripe_pub_key    = $stripeKeys->stripe_publishable_key;
        $paypal_client_id  = null; // set if you add PayPal

        return Inertia::render('Attendee/EventBooth/Payment/Index', compact(
            'payment',
            'stripe_pub_key',
            'paypal_client_id',
            'currency',
            'getCurrency'
        ));
    }

    // Mirrors your product "update" endpoint: mark as sold after Stripe success
    public function updateBooth(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) abort(404);

        // Only allow if still available
        if ($booth->status !== 'available') {
            return response()->json(['status' => false, 'message' => 'This booth is no longer available.'], 409);
        }

        // Assign booth and mark soldout
        $booth->attendee_id = $attendee->id;
        $booth->status      = 'soldout';
        $booth->save();
        $this->sendEmail($booth);

        return response()->json(['status' => true, 'message' => 'Booth purchased successfully.']);
    }

    public function successView()
    {

        return Inertia::render('Attendee/EventBooth/Payment/PaymentSuccess');
    }

    public function paymentCancel()
    {
        return Inertia::render('Attendee/EventBooth/Payment/PaymentCancel');
    }
    private function sendEmail(EventBooth $booth): void
    {
        if ($booth->attendee_id) {
            $attendee = Attendee::where('id', $booth->attendee_id)->first();
            $eventapp = EventApp::where('id', $booth->event_app_id)->first();

            if ($attendee && $attendee->email && $eventapp) {
                // mirrors your style: Mail::to(...)->send(new ...)
                Mail::to($attendee->email)->send(
                    new EventSponsorshipAwardedMail($eventapp, $booth, $attendee)
                );
            }
        }
    }
}
