<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Services\StripePaymentService;
use Exception;

class PaymentController extends Controller
{

    protected $stripe_payment_service;

    public function __construct(StripePaymentService $stripePaymentService)
    {
        $this->stripe_payment_service = $stripePaymentService;
    }

    public function ticketsPage(EventApp $eventApp)
    {
        $eventApp->load(['tickets.sessions']);
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
    }

    public function postTickets(Request $request, EventApp $eventApp)
    {
        $amount = $request->get('grandTotalAmount');
        $tickets = $request->get('tickets');
        $stripe_pub_key = $this->stripe_payment_service->StripKeys()->stripe_publishable_key;

        // Check if organizer of current Event [attendee->event_app_id] have setup strip keys in setting

        if ($stripe_pub_key && $this->stripe_payment_service->StripKeys()->stripe_secret_key) {
            return Inertia::render('Attendee/Payment/Index', compact([
                'eventApp',
                'amount',
                'tickets',
                'stripe_pub_key'
            ]));
        } else {
            return Inertia::render('Attendee/Payment/NoPaymentKeys');
        }
    }

    public function checkoutPage(EventApp $eventApp)
    {
        return Inertia::render('Attendee/Checkout', compact(['eventApp']));
    }

    public function createPaymentIntent(Request $request)
    {
        $amount = $request->input('amount');
        $client_secret = $this->stripe_payment_service->createPaymentIntent($amount);

        return response()->json(['client_secret' => $client_secret, 'intent' => null]);
    }

    public function paymentSuccess(EventApp $eventApp)
    {
        return Inertia::render(
            'Attendee/Payment/PaymentSuccess',
            compact(['eventApp'])
        );
    }

    public function updateAttendeePaymnet(Request $request)
    {
        return response()->json(['message' => 'Attendee payment status has been updated']);
    }

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
