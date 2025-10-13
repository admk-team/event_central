<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\EventApp;

class PayPalService
{
    public function PayPalKeys()
    {
        $eventApp = EventApp::find(auth()->user()->event_app_id ?? session('event_id'));
        return $eventApp->organiser->payment_keys;
    }

    public function getClientId()
    {
        return $this->PayPalKeys()->paypal_pub;
    }
    // Get Access Token
    public function getAccessToken()
    {
        $keys = $this->PayPalKeys();
        $clientId = $keys->paypal_pub;
        $clientSecret = $keys->paypal_secret;
        $baseUrl = $keys->paypal_base_url;

        $response = Http::asForm()->withBasicAuth($clientId, $clientSecret)
            ->post("{$baseUrl}/v1/oauth2/token", [
                'grant_type' => 'client_credentials'
            ]);

        return $response->json()['access_token'] ?? null;
    }

    // Create Order
    public function createOrder($amount, $currency = 'USD')
    {
        $keys = $this->PayPalKeys();
        $baseUrl = $keys->paypal_base_url;

        $accessToken = $this->getAccessToken();

        $response = Http::withToken($accessToken)->post("{$baseUrl}/v2/checkout/orders", [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' =>  $keys->currency,
                        'value' => $amount
                    ]
                ]
            ]
        ]);

        return $response->json();
    }

    // Capture Payment
    public function capturePayment($orderId)
    {
        $keys = $this->PayPalKeys();
        $baseUrl = $keys->paypal_base_url;

        $accessToken = $this->getAccessToken();

        $response = Http::withToken($accessToken)->post("{$baseUrl}/v2/checkout/orders/{$orderId}/capture");

        return $response->json();
    }
}
