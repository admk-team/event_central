<?php

namespace App\Http\Controllers\Attendee\Payment;

use Exception;
use Inertia\Inertia;
use App\Models\Addon;
use App\Models\EventApp;
use App\Models\PromoCode;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use chillerlan\QRCode\QRCode;
use App\Models\EventAppTicket;
use App\Models\TransferTicket;
use App\Models\AttendeePayment;
use App\Services\PayPalService;
use App\Services\StripeService;
use chillerlan\QRCode\QROptions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use chillerlan\QRCode\Common\EccLevel;
use Illuminate\Support\Facades\Storage;
use App\Models\AttendeePurchasedTickets;

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
        $eventApp->load(['public_tickets.sessions', 'public_tickets.addons']);
        // return $eventApp;
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
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
        return Inertia::render(
            'Attendee/Payment/PaymentSuccess'
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
        $this->purchasedTickets();
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

    public function purchasedTickets()
    {

        $event = null;
        $attendee = auth()->user();
        $attendee->load('payments');
        if (count($attendee->payments)) {
            $payment = $attendee->payments[0];
            $event = EventApp::find($payment->event_app_id);

            // $qrData .= "payment_id : " . $payment->id . "\n";
            // $qrData .= "event_uuid : " . $event->uuid . "\n";
            // $qrData .= "Event Name : " . $event->name . "\n";
            // $qrData .= "Start Date : " . $event->start_date . "\n";
            // $qrData .= "End Date : " . $event->end_date . "\n";
            // $qrData .= "Amount Paid : " . $payment->amount_paid . "\n";
            // $qrData .= "\n";
            // $qrData .= "Tickets: " . "\n";
            foreach ($payment->purchased_tickets as $ticket_purchased) {
                $purchasedticket = AttendeePurchasedTickets::find($ticket_purchased->id);
                $code = $purchasedticket->generateUniqueKey();
                $qrData = env('APP_URL') . '/attendee-pass/' . $code;

                $options = new QROptions([
                    // 'version' => 5,
                    'eccLevel' => EccLevel::L,
                    'scale' => 5,
                    'outputType' => QRCode::OUTPUT_IMAGE_PNG,
                    'imageBase64' => false,
                ]);

                $qrcode = new QRCode($options);

                // Clear any buffer to avoid output issues
                if (ob_get_length()) {
                    ob_end_clean();
                }

                Storage::put('public/qr-codes/' . $code . '.png', $qrcode->render(
                    $qrData
                ));

                $purchasedticket->update([
                    'qr_code' => 'qr-codes/' . $code . '.png',
                    'code' => $code
                ]);
            }

            return $payment->purchased_tickets;
        }
    }

    public function attendeeTickets()
    {
        $event = null;
        $attendee = auth()->user();
        $attendee->load('payments');
        $payment = $attendee->payments[0];
        $eventApp = EventApp::find($payment->event_app_id);
        $image = [];
        foreach ($payment->purchased_tickets as $purchasedTicket) {
            $image[] = [
                'qr_code' => asset('Storage/' . $purchasedTicket->qr_code),
                'purchased_id' => $purchasedTicket->id,
            ];
        }
        return Inertia::render('Attendee/Tickets/PurchasedTickets', compact(['eventApp', 'image']));
    }

    public function submitTicketTransfer(Request $request)
    {
        $emails = $request->input('emails');
        foreach ($emails as $index => $email) {
            if ($email) {
                $transferTicket = TransferTicket::create([
                    'attendee_id' => auth()->user()->id,
                    'attendee_payment_id' => $index,
                    'event_app_id' => auth()->user()->event_app_id,
                    'transfer_email' => $email,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Emails submitted successfully!');
    }
}
