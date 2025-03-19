<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use Exception;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{

    public function ticketsPage(EventApp $eventApp)
    {
        $eventApp->load(['tickets.sessions']);
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
    }


    public function postTickets(Request $request, EventApp $eventApp)
    {
        Log::info($request->all());
        $amount = $request->get('grandTotalAmount');
        $tickets = $request->get('tickets');

        return Inertia::render('Attendee/Payment/Index', compact([
            'eventApp',
            'amount',
            'tickets'
        ]));
    }


    public function checkoutPage(EventApp $eventApp)
    {
        return Inertia::render('Attendee/Checkout', compact(['eventApp']));
    }


    public function createPaymentIntent(Request $request)
    {
        // Stripe::setApiKey('sk_test_51R3iHCPNcWTtCzebYEqRS1ZyIUkRPiNYrnhm0kpMrqv5kfZKeELsElbWAl5Pvy19ZbmpKUZUZ7HjpIdiLmarvFEp001S8D1Jhe');
        // Keys

        //Ansar
        // public  pk_test_51R3iHCPNcWTtCzebbzvUsG7XMmMnTqUxbs4NE9v8CH5IJxtaMXDgz5FMA96HnS93ZQw9DN6wHLlxgtFW90XW0Q4z004QlcW5Z8
        // secret sk_test_51R3iHCPNcWTtCzebYEqRS1ZyIUkRPiNYrnhm0kpMrqv5kfZKeELsElbWAl5Pvy19ZbmpKUZUZ7HjpIdiLmarvFEp001S8D1Jhe

        //Haseeb
        // public  pk_test_51Py6kWHInNTlTUGPM5l30Odo4AOb48C48enPnOsKrw9xhueHWeYlC0lpnRRvtbwMNosFC3UWEZY4c48MsuohS5F700Lyxn0hSm
        // secret sk_test_51Py6kWHInNTlTUGPSnnyUIva83aHRr6ZMpApIGHZKtkgQcVIN1jsgcTQ5Ubp4oW96UdyDeeJROudsNDKFUjpdGrl00ItMh1P7P

        $amount = $request->input('amount');

        $stripe = new \Stripe\StripeClient('sk_test_51R3iHCPNcWTtCzebYEqRS1ZyIUkRPiNYrnhm0kpMrqv5kfZKeELsElbWAl5Pvy19ZbmpKUZUZ7HjpIdiLmarvFEp001S8D1Jhe');
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $amount * 100,
            'currency' => 'USD',
            // 'customer' => auth()->user()->first_name,
            'receipt_email' => auth()->user()->email,
            "description" => 'Event Central Ticket Purchasing',
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        return response()->json(['client_secret' => $paymentIntent->client_secret, 'intent' => $paymentIntent]);
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
        Log::info('Payment Updating. . .');
        Log::info($request->all());
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
