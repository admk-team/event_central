<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventProduct;
use App\Models\Order;
use App\Models\OrderItem;
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
        $products = EventProduct::where('event_app_id', Auth::user()->event_app_id)->get();
        return Inertia::render('Attendee/EventShop/Index', compact('products'));
    }

    public function checkoutPage($paymentId)
    {
        $payment = Order::where('id', $paymentId)->first();
        if ($payment->status === 'pending') {
            $stripe_pub_key = $this->stripe_service->StripKeys($payment->event_app_id)->stripe_publishable_key;
            $paypal_client_id = null;
            return Inertia::render('Attendee/ProductPayment/Index', compact([
                'payment',
                'stripe_pub_key',
                'paypal_client_id'
            ]));
        } else {
            return redirect()->route('attendee.tickets.get')->withError("Payment has already been processed against this Payment ID");
        }
    }

    public function checkout(Request $request)
    {
        $product = EventProduct::where('id', $request->product_id)->where('event_app_id', Auth::user()->event_app_id)->first();
        if ($product->stock == $product->sold_qty) {
            return response()->json([
                'status' => false,
                'message' => 'This item out of stock'
            ]);
        }
        $attendee = auth()->user();
        $amount = $product->price;
        $stripe_response = $this->stripe_service->createPaymentIntent($attendee->event_app_id, $amount);
        $client_secret = $stripe_response['client_secret'];
        $payment_id = $stripe_response['payment_id'];

        $payment = Order::create([
            'event_app_id' => $attendee->event_app_id,
            'user_id' => $attendee->id,
            'status' => 'pending',
            'total_amount' => $amount,
            'stripe_id' => $payment_id,
            'stripe_intent' => $client_secret,
            'payment_method' => 'stripe'
        ]);

        //create the order items
        OrderItem::create([
            'order_id' => $payment->id,
            'event_product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price
        ]);

        return $payment;
    }

    public function updateOrder($paymentId)
    {
        $order = Order::where('id', $paymentId)->with(['items.product'])->first();

        if (!$order) {
            throw new \Exception('Payment object not found with id ' . $paymentId);
        }
        $order->status = 'paid';
        $order->save();

        foreach ($order->items as $item) {
            if ($item->product) {
                $item->product->increment('sold_qty', $item->quantity);
            }
        }

        return response()->json([
            'message' => 'Order marked as paid and product sold quantities updated'
        ]);
    }

    public function paymentSuccess()
    {
        return Inertia::render('Attendee/ProductPayment/PaymentSuccess');
    }

    public function paymentCancel()
    {
        return Inertia::render('Attendee/ProductPayment/PaymentCancel');
    }
}
