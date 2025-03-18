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
        return Inertia::render('Attendee/Tickets', compact(['eventApp']));
    }


    public function postTickets(Request $request, EventApp $eventApp)
    {
        Log::info($request->all());
        return Inertia::render('Attendee/Payment', compact(['eventApp']));
    }


    public function checkoutPage(EventApp $eventApp)
    {
        return Inertia::render('Attendee/Checkout', compact(['eventApp']));
    }


    public function createCheckoutSession(Request $request)
    {
        // public  pk_test_51Py6kWHInNTlTUGPM5l30Odo4AOb48C48enPnOsKrw9xhueHWeYlC0lpnRRvtbwMNosFC3UWEZY4c48MsuohS5F700Lyxn0hSm

        // secret sk_test_51Py6kWHInNTlTUGPSnnyUIva83aHRr6ZMpApIGHZKtkgQcVIN1jsgcTQ5Ubp4oW96UdyDeeJROudsNDKFUjpdGrl00ItMh1P7P
        Stripe::setApiKey('sk_test_51Py6kWHInNTlTUGPSnnyUIva83aHRr6ZMpApIGHZKtkgQcVIN1jsgcTQ5Ubp4oW96UdyDeeJROudsNDKFUjpdGrl00ItMh1P7P');

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Sample Product',
                    ],
                    'unit_amount' => 1000, // Amount in cents (e.g., $10.00)
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => url('/success'),
            'cancel_url' => url('/cancel'),
        ]);

        return response()->json(['id' => $session->id]);
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
