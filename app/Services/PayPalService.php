<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\EventApp;

class PayPalService
{
    protected $baseUrl;
    protected $clientId;
    protected $clientSecret;

    public function getPaymentKeys()
    {
        $eventApp = EventApp::find(auth()->user()->event_app_id);

        $keys = $eventApp->organiser->payment_keys;
        $this->baseUrl = $keys->paypal_base_url;
        $this->clientId = $keys->paypal_pub;
        $this->clientSecret = $keys->paypal_secret;
        return true;
    }

    // Get Access Token
    public function getAccessToken()
    {
        $response = Http::asForm()->withBasicAuth($this->clientId, $this->clientSecret)
            ->post("{$this->baseUrl}/v1/oauth2/token", [
                'grant_type' => 'client_credentials'
            ]);

        return $response->json()['access_token'] ?? null;
    }

    // Create Order
    public function createOrder($amount, $currency = 'USD')
    {
        $accessToken = $this->getAccessToken();

        $response = Http::withToken($accessToken)->post("{$this->baseUrl}/v2/checkout/orders", [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => $currency,
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
        $accessToken = $this->getAccessToken();

        $response = Http::withToken($accessToken)->post("{$this->baseUrl}/v2/checkout/orders/{$orderId}/capture");

        return $response->json();
    }
}
