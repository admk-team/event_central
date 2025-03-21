<?php

namespace App\Services;

use Exception;
use Stripe\Stripe;
use Illuminate\Support\Facades\Log;
use App\Models\EventApp;

class StripeService
{

    public function StripKeys()
    {
        $eventApp = EventApp::find(auth()->user()->event_app_id);
        return $eventApp->organiser->payment_keys;
    }

    public function getPublishableKey()
    {
        return $this->StripKeys()->stripe_publishable_key;
    }

    public function createPaymentIntent($amount, $currency = 'USD')
    {
        try {
            $stripe = new \Stripe\StripeClient($this->StripKeys()->stripe_secret_key);

            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => $amount * 100,
                'currency' => $currency,
                'receipt_email' => auth()->user()->email,
                "description" => 'Event Central Ticket Purchasing',
                'automatic_payment_methods' => ['enabled' => true],
            ]);
            return $paymentIntent->client_secret;
        } catch (Exception $ex) {
            Log::info($ex->getMessage());
        }
    }


    // Stripe::setApiKey('sk_test_51R3iHCPNcWTtCzebYEqRS1ZyIUkRPiNYrnhm0kpMrqv5kfZKeELsElbWAl5Pvy19ZbmpKUZUZ7HjpIdiLmarvFEp001S8D1Jhe');
    // Keys

    //Ansar
    // public  pk_test_51R3iHCPNcWTtCzebbzvUsG7XMmMnTqUxbs4NE9v8CH5IJxtaMXDgz5FMA96HnS93ZQw9DN6wHLlxgtFW90XW0Q4z004QlcW5Z8
    // secret sk_test_51R3iHCPNcWTtCzebYEqRS1ZyIUkRPiNYrnhm0kpMrqv5kfZKeELsElbWAl5Pvy19ZbmpKUZUZ7HjpIdiLmarvFEp001S8D1Jhe

    //Haseeb
    // public  pk_test_51Py6kWHInNTlTUGPM5l30Odo4AOb48C48enPnOsKrw9xhueHWeYlC0lpnRRvtbwMNosFC3UWEZY4c48MsuohS5F700Lyxn0hSm
    // secret sk_test_51Py6kWHInNTlTUGPSnnyUIva83aHRr6ZMpApIGHZKtkgQcVIN1jsgcTQ5Ubp4oW96UdyDeeJROudsNDKFUjpdGrl00ItMh1P7P

}
