<?php

namespace App\Http\Controllers\Attendee\Payment;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\Attendee;
use App\Models\AttendeePayment;
use App\Models\AttendeePurchasedTickets;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\PromoCode;
use App\Models\TicketFeature;
use App\Services\PayPalService;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function PHPSTORM_META\map;

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
        $eventApp->load(['tickets.sessions', 'tickets.addons']);
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
    }

    // public function postTickets(Request $request)
    // {
    //     // Log::info($request->all());
    //     $eventApp =  EventApp::find(auth()->user()->event_app_id);
    //     $amount = $request->get('grandTotalAmount');
    //     $tickets = $request->get('tickets');
    //     $stripe_pub_key = $this->stripe_service->StripKeys()->stripe_publishable_key;
    //     $paypal_client_id = $this->paypal_service->payPalKeys()->paypal_pub;

    //     // Check if organizer of current Event [attendee->event_app_id]
    //     //have setup strip keys in setting

    //     if ($stripe_pub_key && $this->stripe_service->StripKeys()->stripe_secret_key) {
    //         return Inertia::render('Attendee/Payment/Index', compact([
    //             'eventApp',
    //             'amount',
    //             'tickets',
    //             'stripe_pub_key',
    //             'paypal_client_id'
    //         ]));
    //     } else {
    //         return Inertia::render('Attendee/Payment/NoPaymentKeys');
    //     }
    // }

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


    public function showCheckoutPage($paymentUuId)
    {
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();
        // return $payment;
        if ($payment->status === 'pending') {
            $stripe_pub_key = $this->stripe_service->StripKeys()->stripe_publishable_key;
            $paypal_client_id = $this->paypal_service->payPalKeys()->paypal_pub;
            return Inertia::render('Attendee/Payment/Index', compact([
                'payment',
                'stripe_pub_key',
                'paypal_client_id',
            ]));
        } else {
            return redirect()->route('attendee.tickets.get')->withError("Payment has already been processed against this Payment ID");
        }
    }
    //Create Attendee Payment record and all tickets and addons includee
    // then create stripe paymnet intent and erturn to front end.
    public function checkout(Request $request)
    {
        $data = $request->all();
        $user = auth()->user();
        $amount = $data['totalAmount'];
        $client_secret = $this->stripe_service->createPaymentIntent($amount);

        $payment = AttendeePayment::create([
            'uuid' => Str::uuid(),
            'event_app_id' => $user->event_app_id,
            'attendee_id' => $user->id,
            'discount_code' => $data['discount_code'],
            'sub_total' => $data['subTotal'],
            'discount' => $data['discount'],
            'amount_paid' => $data['totalAmount'],
            'stripe_intent' => $client_secret,
            'status' => 'pending',
            'payment_method' => 'stripe',
        ]);

        foreach ($data['tickets'] as $ticket) {
            $addons = $ticket['addons'];
            $data = $ticket['ticket'];
            $attendee_purchased_ticket = AttendeePurchasedTickets::create([
                'attendee_payment_id' => $payment->id,
                'event_app_ticket_id' => $user->event_app_id,
                'qty' => 1,
                'discount_code' => null,
                'price' => $data['base_price'],
                'discount' => 0,
                'subTotal' => $data['base_price'],
                'total' => $data['base_price']
            ]);
            $addon_ids = $names = array_column($addons, "id");
            $attendee_purchased_ticket->purchased_addons()->sync($addon_ids);
        }
        return $payment;
    }

    public function paymentSuccess($paymentUuId)
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

    public function updateAttendeePaymnet($paymentUuId)
    {
        $attendee = auth()->user();
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();
        if (!$payment) {
            throw new Exception('Payment object not found with uuid ' . $paymentUuId);
        }

        DB::beginTransaction();
        try {
            $payment->status = 'paid';
            $payment->save();
            // Create Attendee Payment record
            if ($payment->discount_code) {
                // Update Promo Code Usage Count
                $code = PromoCode::where('code', $payment->discount_code)->first();
                if ($code) {
                    $code->increment('used_count');
                    $code->save();
                }
            }
            //Load Tickets and Addons
            $payment->load('purchased_tickets.purchased_addons');

            foreach ($payment->purchased_tickets as $purchasedTicket) {
                // Log::info($purchasedTicket);
                foreach ($purchasedTicket->purchased_addons as $addon) {
                    // Log::info($addon);
                    $addonObject = Addon::find($addon->id);
                    $addonObject->increment('qty_sold');
                    // $addonObject->update(['qty_sold' => $qty_sold]);
                    $addonObject->save();
                }
                // //Update Attendee Sessions
                $session_ids = $purchasedTicket->ticket->sessions()->pluck('id');
                foreach ($session_ids as $id) {
                    // Session might be already attached to attendee from any other ticket
                    try {
                        $attendee->eventSelectedSessions()->attach($id);
                    } catch (Exception $ex) {
                        Log::error($ex->getMessage());
                    }
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong while updating Payment Status'], 500);
        }
        return response()->json(['message' => 'Attendee payment status has been updated']);
    }


    // Validate Promo Codes
    public function  validateDiscCode($disCode)
    {
        $code = PromoCode::where(function ($subQuery) use ($disCode) {
            $subQuery->where('code', $disCode);
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
