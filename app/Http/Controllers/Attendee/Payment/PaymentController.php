<?php

namespace App\Http\Controllers\Attendee\Payment;

use Exception;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Models\TicketFeature;
use App\Models\EventAppTicket;
use App\Models\AttendeePayment;
use App\Services\PayPalService;
use App\Services\StripeService;
use PhpParser\Node\Stmt\Catch_;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\AttendeePurchasedTickets;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use chillerlan\QRCode\Common\EccLevel;

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
        $eventApp->load(['tickets.sessions']);
        return Inertia::render('Attendee/Tickets/Index', compact(['eventApp']));
    }

    public function postTickets(Request $request)
    {
        $eventApp =  EventApp::find(auth()->user()->event_app_id);
        $amount = $request->get('grandTotalAmount');
        $tickets = $request->get('tickets');
        $stripe_pub_key = $this->stripe_service->StripKeys()->stripe_publishable_key;
        $paypal_client_id = $this->paypal_service->payPalKeys()->paypal_pub;

        // Check if organizer of current Event [attendee->event_app_id]
        //have setup strip keys in setting
        if ($stripe_pub_key && $this->stripe_service->StripKeys()->stripe_secret_key) {
            return Inertia::render('Attendee/Payment/Index', compact([
                'eventApp',
                'amount',
                'tickets',
                'stripe_pub_key',
                'paypal_client_id'
            ]));
        } else {
            return Inertia::render('Attendee/Payment/NoPaymentKeys');
        }
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

    public function paymentSuccess()
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

    public function updateAttendeePaymnet(Request $request)
    {
        $data = $request->all();
        $event_id = auth()->user()->event_app_id;
        $attendee = auth()->user();

        DB::beginTransaction();
        try {
            // Create Attendee Payment record
            $payment = AttendeePayment::create([
                'event_app_id' => $event_id,
                'attendee_id' => $attendee->id,
                'amount_paid' => $data['amount'],
                'payment_method' => 'stripe'
            ]);
            // Create record for every tickets purchased by attendee
            foreach ($data['tickets'] as $purchased_ticket) {
                AttendeePurchasedTickets::create([
                    'attendee_payment_id' => $payment->id,
                    'event_app_ticket_id' => $purchased_ticket['event_app_ticket_id'],
                    'qty' => $purchased_ticket['qty'],
                    'discount_code' => $purchased_ticket['discountCode'],
                    'price' => $purchased_ticket['price'],
                    'discount' => $purchased_ticket['discount'],
                    'subTotal' => $purchased_ticket['subTotal'],
                    'total' => $purchased_ticket['total']
                ]);

                // Update Promo Code Usage Count
                $code = PromoCode::where('code', $purchased_ticket['discountCode'])->first();
                if ($code) {
                    $code->increment('used_count');
                    $code->save();
                }

                // Update Ticket Feature Qty Sold
                $ticket = EventAppTicket::find($purchased_ticket['event_app_ticket_id']);
                $features_ids = $ticket->features()->pluck('id');

                foreach ($features_ids as $id) {
                    $feature = TicketFeature::find($id);
                    $qty_sold = $feature->qty_sold + intval($purchased_ticket['qty']);
                    Log::info($qty_sold);
                    $feature->update(['qty_sold' => $qty_sold]);
                    $feature->save();
                }

                //Update Attendee Sessions
                $session_ids = $ticket->sessions()->pluck('id');
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
            return response()->json(['message' => 'Something went wrong'], 500);
        }
        return response()->json(['message' => 'Attendee payment status has been updated']);
    }

    // Validate Promo Codes
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

    public function purchasedTickets()
    {
        $qrData = env('APP_URL') . '/attendee-pass';
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
                $ticket = EventAppTicket::find($ticket_purchased->event_app_ticket_id);
                // $qrData .= " ticket_id: " . $ticket_purchased->event_app_ticket_id . "\n";
                // $qrData .= " Name: " . $ticket->name . "\n";
                // $qrData .= " Ticket Sessions: \n";
                // foreach ($ticket->sessions as $session) {
                //     $qrData .= "  session_id: " . $session->id . "\n";
                // }
            }
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

            Storage::put('public/qr-codes/' . $attendee->id . '.png', $qrcode->render(
                $qrData
            ));


            // $pdf = Pdf::loadView('attendee-pass-pdf', compact(['attendee', 'event']));
            // return $pdf->download('pass.pdf');
            // return view('attendee-pass-pdf', compact(['attendee', 'event']));
            return Inertia::render('Attendee/Tickets/PurchasedTickets', compact(['attendee', 'event']));
        }
    }
}
