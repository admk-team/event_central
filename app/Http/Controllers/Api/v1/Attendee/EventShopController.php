<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventProduct;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrganizerPaymentKeys;
use App\Services\StripeService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventShopController extends Controller
{
    protected $stripe_service;

    public function __construct(StripeService $stripeService)
    {
        $this->stripe_service = $stripeService;
    }

    public function index()
    {
        $user = Auth::user();

        $products = EventProduct::where('event_app_id', $user->event_app_id)->get();
        $eventApp = EventApp::findOrFail($user->event_app_id);
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        return response()->json([
            'status' => true,
            'products' => $products,
            'currency' => $getCurrency
        ]);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:event_products,id',
            'currency' => 'required|string'
        ]);

        $user = Auth::user();
        $product = EventProduct::where('id', $request->product_id)
            ->where('event_app_id', $user->event_app_id)
            ->first();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }

        if ($product->stock == $product->sold_qty) {
            return response()->json([
                'status' => false,
                'message' => 'This item is out of stock'
            ]);
        }

        $amount = $product->price;
        $stripe_response = $this->stripe_service->createPaymentIntent($user->event_app_id, $amount, $request->currency);

        $payment = Order::create([
            'event_app_id' => $user->event_app_id,
            'user_id' => $user->id,
            'status' => 'pending',
            'total_amount' => $amount,
            'stripe_id' => $stripe_response['payment_id'],
            'stripe_intent' => $stripe_response['client_secret'],
            'payment_method' => 'stripe'
        ]);

        OrderItem::create([
            'order_id' => $payment->id,
            'event_product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price
        ]);

        return $this->checkoutPage($payment->id);
    }

    public function checkoutPage($paymentId)
    {
        $user = Auth::user();
        $eventApp = EventApp::findOrFail($user->event_app_id);
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);
        $payment = Order::where('id', $paymentId)->first();

        if (!$payment) {
            return response()->json([
                'status' => false,
                'message' => 'Payment record not found'
            ], 404);
        }

        if ($payment->status === 'pending') {
            $stripe_key = $this->stripe_service->StripKeys($payment->event_app_id);
            return response()->json([
                'status' => true,
                'payment' => $payment,
                'stripe_pub_key' => $stripe_key->stripe_publishable_key,
                'currency' => $stripe_key->currency,
                'paypal_client_id' => null,
                'app_currency' => $getCurrency
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Payment has already been processed for this Payment ID'
        ], 400);
    }

    public function updateOrder($paymentId)
    {
        $order = Order::where('id', $paymentId)->with(['items.product'])->first();

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Payment object not found with ID ' . $paymentId
            ], 404);
        }

        $order->status = 'paid';
        $order->save();

        foreach ($order->items as $item) {
            if ($item->product) {
                $item->product->increment('sold_qty', $item->quantity);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Order marked as paid and product sold quantities updated'
        ]);
    }

    public function paymentSuccess()
    {
        return response()->json([
            'status' => true,
            'message' => 'Payment successful'
        ]);
    }

    public function paymentCancel()
    {
        return response()->json([
            'status' => false,
            'message' => 'Payment was cancelled'
        ]);
    }
}
