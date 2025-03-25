<?php

namespace App\Http\Controllers\Attendee\Payment;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Services\PayPalService;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class PaymentController extends Controller
{

    protected $stripe_service;
    protected $paypal_service;

    public function __construct(StripeService $stripePaymentService, PayPalService $payPalService)
    {
        $this->stripe_service = $stripePaymentService;
        $this->paypal_service = $payPalService;
    }

    public function StripKeys()
    {
        $eventApp = EventApp::find(auth()->user()->event_app_id);
        return $eventApp->organiser->payment_keys;
    }

    public function viewTickets()
    {
        $eventApp =  EventApp::find(auth()->user()->event_app_id);
        $eventApp->load(['tickets.sessions']);
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
    }

    public function postTickets(Request $request)
    {
        $eventApp =  EventApp::find(auth()->user()->event_app_id);
        $amount = $request->get('grandTotalAmount');
        $tickets = $request->get('tickets');
        $stripe_pub_key = $this->stripe_service->StripKeys()->stripe_publishable_key;
        $paypal_client_id = $this->paypal_service->payPalKeys()->paypal_pub;

        // Check if organizer of current Event [attendee->event_app_id]
        //have setup strip keys in setting
        if ($stripe_pub_key && $this->stripe_service->StripKeys()->stripe_secret_key) {
            return Inertia::render('Attendee/Payment/Index', compact([
                'eventApp',
                'amount',
                'tickets',
                'stripe_pub_key',
                'paypal_client_id'
            ]));
        } else {
            return Inertia::render('Attendee/Payment/NoPaymentKeys');
        }
    }

    // PayPal Payment
    //==================================================================================
    // Create PayPal Order
    public function createPaypalOrder(Request $request)
    {
        $order = $this->paypal_service->createOrder($request->amount);
        return response()->json($order);
    }

    // Capture PayPal Payment
    public function capturePaypalOrder(Request $request)
    {
        $response = $this->paypal_service->capturePayment($request->order_id);
        return response()->json($response);
    }



    // Stripe Payment
    //===================================================================================
    public function checkoutPage(EventApp $eventApp)
    {
        return Inertia::render('Attendee/Checkout', compact(['eventApp']));
    }

    public function createPaymentIntent(Request $request)
    {
        $amount = $request->input('amount');
        $client_secret = $this->stripe_service->createPaymentIntent($amount);

        return response()->json(['client_secret' => $client_secret, 'intent' => null]);
    }

    public function paymentSuccess()
    {
        $eventApp =  EventApp::find(auth()->user()->event_app_id);

        return Inertia::render(
            'Attendee/Payment/PaymentSuccess',
            compact(['eventApp'])
        );
    }

    public function paymentCancel()
    {
        return Inertia::render('Attendee/Payment/PaymentCancel');
    }

    public function updateAttendeePaymnet()
    {
        return response()->json(['message' => 'Attendee payment status has been updated']);
    }

    // Validate Promo Codes
    public function  validateDiscCode($ticketId, $code)
    {
        $ticket = EventAppTicket::find($ticketId);
        $code = $ticket->promoCodes()->where(function ($subQuery) use ($code) {
            $subQuery->where('code', $code);
            $subQuery->where('status', 'active');
            $subQuery->whereColumn('used_count', '<', 'usage_limit');
            $subQuery->whereDate('end_date', '>', date('Y-m-d'));
        })->first();
        if ($code) {
            return response()->json(['code' => $code]);
        } else {
            throw new Exception('Invalid Code');
        }
    }
}
