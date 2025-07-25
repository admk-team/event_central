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

use App\Models\AttendeeTransferedTicket;
use App\Models\AttendeePayment;
use App\Services\PayPalService;
use App\Services\StripeService;
use chillerlan\QRCode\QROptions;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\AttendeeCheckoutRequest;
use App\Mail\AttendeeTicketPurchasedEmail;
use App\Models\Attendee;
use chillerlan\QRCode\Common\EccLevel;
use Illuminate\Support\Facades\Storage;
use App\Models\AttendeePurchasedTickets;
use App\Models\AttendeeRefundTicket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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

    public function viewTickets($organizerView = false, $attendee_id = null)
    {

        $eventApp = null;
        $attendees = [];
        $lasteventDate = [];
        //If Page is being visited by Organizer
        if ($organizerView) {
            $eventApp = EventApp::with('dates')->find(session('event_id'));
            $lasteventDate = $eventApp->dates()->orderBy('date', 'desc')->get();

            $attendees = $eventApp->attendees()->select(['id as value', DB::raw("CONCAT(first_name, ' ', last_name) as label")])->get();
        } else {
            $eventApp =  EventApp::with('dates')->find(auth()->user()->event_app_id);
            $lasteventDate = $eventApp->dates()->orderBy('date', 'desc')->get();
        }
        if ($organizerView) {     //For organizer show all tickets
            $eventApp->load([
                'tickets.sessions',
                'tickets.addons',
                'tickets.fees'
            ]);
        } else {                //For attendees show only public tickets
            $eventApp->load([
                'public_tickets.sessions',
                'public_tickets' => [
                    'addons' => function ($query) {
                        $query->where(function ($query) {
                            $query->where('addons.event_app_ticket_id', null)
                                ->whereColumn('qty_total', '>', 'qty_sold');
                        })
                            ->orWhereHas('ticket', function ($query) {
                                $query->whereColumn('qty_total', '>', 'qty_sold');
                            });
                    }
                ],
                'public_tickets.fees'
            ]);
        }

        // return $eventApp;
        return Inertia::render('Attendee/Tickets/Index', compact([
            'eventApp',
            'organizerView',
            'attendees',
            'attendee_id',
            'lasteventDate'
        ]));
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
        // $amount = $request->input('amount');
        // $client_secret = $this->stripe_service->createPaymentIntent($amount);

        // return response()->json(['client_secret' => $client_secret, 'intent' => null]);
    }


    public function showCheckoutPage($paymentUuId, $organizerView = null)
    {
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();
        // return $payment;
        if ($payment->status === 'pending') {
            $stripe_pub_key = $this->stripe_service->StripKeys($payment->event_app_id)->stripe_publishable_key;
            $paypal_client_id = null;
            // $paypal_client_id = $this->paypal_service->payPalKeys()->paypal_pub;
            return Inertia::render('Attendee/Payment/Index', compact([
                'payment',
                'stripe_pub_key',
                'paypal_client_id',
                'organizerView'
            ]));
        } else {
            return redirect()->route('attendee.tickets.get')->withError("Payment has already been processed against this Payment ID");
        }
    }

    //Create Attendee Payment record and all tickets and addons included
    // then create stripe paymnet intent and return to front end.
    public function checkout(AttendeeCheckoutRequest $request, $organizerView = false, $attendee = null, $payment_method = null)
    {
        $data = $request->all();
        $user = auth()->user();
        $attendee = $organizerView ? $attendee : auth()->user();
        $amount = $data['totalAmount'];
        $stripe_response = $this->stripe_service->createPaymentIntent($attendee->event_app_id, $amount);
        $client_secret = $stripe_response['client_secret'];
        $payment_id = $stripe_response['payment_id'];

        $payment = $user->attendeePayments()->create([
            'uuid' => Str::uuid(),
            'event_app_id' => $attendee->event_app_id,
            'attendee_id' => $attendee->id,
            'discount_code' => $data['discount_code'],
            'sub_total' => $data['subTotal'],
            'discount' => $data['discount'],
            'amount_paid' => $data['totalAmount'],
            'stripe_intent' => $client_secret,
            'stripe_id' => $payment_id,
            'status' => 'pending',
            'organizer_payment_note' => $data['organizer_payment_note'] ?? null,
            'payment_method' => $organizerView ? $payment_method : 'stripe',
        ]);

        foreach ($data['ticketsDetails'] as $ticketsDetail) {
            $addons = $ticketsDetail['addons'];
            $ticket = $ticketsDetail['ticket'];

            $attendee_purchased_ticket = AttendeePurchasedTickets::create([
                'attendee_payment_id' => $payment->id,
                'attendee_id' => $attendee->id,
                'event_app_id' => $payment->event_app_id,
                'event_app_ticket_id' => $ticket['id'],
                'qty' => 1,
                'price' => $ticket['base_price'],
                'fees_sub_total' => $ticketsDetail['fees_sub_total'],
                'addons_sub_total' => $ticketsDetail['addons_sub_total'],
                'total' => $ticket['base_price'] + $ticketsDetail['fees_sub_total'] + $ticketsDetail['addons_sub_total']
            ]);
            $addon_ids = array_column($addons, "id");
            $attendee_purchased_ticket->purchased_addons()->sync($addon_ids);
        }
        return $payment;
    }

    // Create Attendee Payment record and all tickets and addons included
    // then create stripe paymnet intent and return to front end.
    public function checkoutFreeTicket(AttendeeCheckoutRequest $request, $organizerView = false, $attendee = null, $payment_method = null)
    {
        $data = $request->all();
        $user = auth()->user();
        $attendee = $organizerView ? $attendee : auth()->user();
        $amount = $data['totalAmount'];
        // $stripe_response = $this->stripe_service->createPaymentIntent($attendee->event_app_id, $amount);
        // $client_secret = $stripe_response['client_secret'];
        // $payment_id = $stripe_response['payment_id'];

        $payment = $user->attendeePayments()->create([
            'uuid' => Str::uuid(),
            'event_app_id' => $attendee->event_app_id,
            'attendee_id' => $attendee->id,
            'discount_code' => $data['discount_code'],
            'sub_total' => $data['subTotal'],
            'discount' => $data['discount'],
            'amount_paid' => $data['totalAmount'],
            'stripe_intent' => null,
            'stripe_id' => null,
            'status' => 'pending',
            'organizer_payment_note' => $data['organizer_payment_note'] ?? null,
            'payment_method' => $organizerView ? $payment_method : 'stripe',
        ]);

        foreach ($data['ticketsDetails'] as $ticketsDetail) {
            $addons = $ticketsDetail['addons'];
            $ticket = $ticketsDetail['ticket'];

            $attendee_purchased_ticket = AttendeePurchasedTickets::create([
                'attendee_id' => $attendee->id,
                'event_app_id' => $payment->event_app_id,
                'attendee_payment_id' => $payment->id,
                'bt_attendee_payment_id' => $payment->id,    //Added to handle transfer logic
                'event_app_ticket_id' => $ticket['id'],
                'qty' => 1,
                'price' => $ticket['base_price'],
                'fees_sub_total' => $ticketsDetail['fees_sub_total'],
                'addons_sub_total' => $ticketsDetail['addons_sub_total'],
                'total' => $ticket['base_price'] + $ticketsDetail['fees_sub_total'] + $ticketsDetail['addons_sub_total']
            ]);
            $addon_ids = $names = array_column($addons, "id");
            $attendee_purchased_ticket->purchased_addons()->sync($addon_ids);
        }
        //Update Attendee Payment status and session etc
        $this->updateAttendeePaymnet($payment->uuid);
        return $payment;
    }

    public function paymentSuccess($paymentUuId, $organizerView = false)
    {
        return Inertia::render(
            'Attendee/Payment/PaymentSuccess',
            compact(['organizerView'])
        );
    }

    public function paymentCancel()
    {
        return Inertia::render('Attendee/Payment/PaymentCancel');
    }

    public function updateAttendeePaymnet($paymentUuId)
    {
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();
        $attendee = $payment->attendee;

        if (!$payment) {
            throw new Exception('Payment object not found with uuid ' . $paymentUuId);
        }

        //1 Update Payment status to paid
        $payment->status = 'paid';
        $payment->save();

        //2. Generate Ticket QR Code
        $this->purchasedTickets($paymentUuId);

        //3. Send confirmation Email to Attendee along with Ticket QR Codes  -----
        $this->sendPurchasedTicketsEmailToAttendee();

        //4. Increment discount code used count
        if ($payment->discount_code) {
            $code = PromoCode::where('code', $payment->discount_code)->first();
            if ($code) {
                $code->increment('used_count');
                $code->save();
            }
        }

        //5. Increment Addon Sold Qty
        $payment->load('purchased_tickets.purchased_addons'); //Load Tickets and Addons
        foreach ($payment->purchased_tickets as $purchasedTicket) {
            foreach ($purchasedTicket->purchased_addons as $addon) {
                $addonObject = Addon::find($addon->id);
                $addonObject->increment('qty_sold');
                $addonObject->save();
            }
        }

        //6. Update Attendee Sessions
        foreach ($payment->purchased_tickets as $purchasedTicket) {
            $session_ids = $purchasedTicket->ticket->sessions()->pluck('id');
            foreach ($session_ids as $id) {
                // Session might be already attached to attendee from any other ticket
                // try {
                $attendee->eventSelectedSessions()->attach($id, ['attendee_purchased_ticket_id' => $purchasedTicket->id]);
                // } catch (Exception $ex) {
                //     Log::error($ex->getMessage());
                // }
            }
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

    public function sendPurchasedTicketsEmailToAttendee()
    {
        try {
            $attendee = auth()->user();
            $attendee->load('payments.purchased_tickets');
            $attendee_purchased_tickets = [];
            foreach ($attendee->payments as $payment) {
                foreach ($payment->purchased_tickets as $ticket)
                    array_push($attendee_purchased_tickets, $ticket);
            }
            Mail::to($attendee->email)->send(new AttendeeTicketPurchasedEmail($attendee, $attendee_purchased_tickets));
            $emailNotificationList =  eventSettings($attendee->event_app_id)->getValue('email_list');
            $emailNotificationList = explode(',', $emailNotificationList);
            if ($emailNotificationList) {
                Log::info('test', $emailNotificationList);
                foreach ($emailNotificationList as $singleEmail) {
                    Log::info('Test', $attendee->toArray());
                    Mail::to($singleEmail)->send(new AttendeeTicketPurchasedEmail($attendee, $attendee_purchased_tickets));
                }
            }
        } catch (Exception $ex) {
            Log::error('An Error occurred while sending confirmation email to attendee');
            Log::error($ex->getMessage());
        }
    }

    public function purchasedTickets($paymentUuId)
    {

        $payment = AttendeePayment::where('uuid', $paymentUuId)
            ->where('status', 'paid')
            ->first();

        if ($payment) {
            foreach ($payment->purchased_tickets as $ticket_purchased) {
                $purchasedticket = AttendeePurchasedTickets::find($ticket_purchased->id);
                $code = $purchasedticket->generateUniqueKey();
                $qrData = $code;

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
        }
    }

    public function attendeepurchasedTickets()
    {
        $attendee = auth()->user();
        $eventApp = EventApp::find($attendee->event_app_id);
        $purchased_tickets =  $attendee->purchased_tickets();
        $image = [];
        foreach ($purchased_tickets as $purchasedTicket) {
            $image[] = [
                'qr_code' => asset('storage/' . $purchasedTicket->qr_code),
                'purchased_id' => $purchasedTicket->id,
                'event_app_ticket_id' => $purchasedTicket->event_app_ticket_id,
                'transfer_check' => $purchasedTicket->is_transfered,
                'ticket_name' => $purchasedTicket->ticket?->name ?? '',
                'ticket_type_name' => isset($purchasedTicket->ticket->ticketType->name) ?
                    $purchasedTicket->ticket->ticketType->name : '', // <-- added line
            ];
        }

        return Inertia::render('Attendee/Tickets/PurchasedTickets', [
            'eventApp' => $eventApp,
            'attendee' => $attendee,
            'image' => $image,
            'hasTickets' => count($purchased_tickets) > 0 ? true : false,
        ]);
    }


    public function submitTicketTransfer(Request $request)
    {
        $emails = $request->input('emails');
        //dd($emails);
        foreach ($emails as $index => $email) {
            if ($email) {

                $ticket = AttendeePurchasedTickets::find($index)->load('payment');
                $ticket->update(['is_transfered' => true, 'transfered_to_email' => $email]);

                AttendeeTransferedTicket::create([
                    'event_app_id' => $ticket->payment->event_app_id,
                    'email' => $email,
                    'payment_method' => $ticket->payment->payment_method,
                    'stripe_intent' => $ticket->payment->stripe_intent,
                    'attendee_purchased_ticket_id' => $ticket->id,
                    'event_app_ticket_id' => $ticket->event_app_ticket_id,
                    'bt_attendee_payment_id' => $ticket->attendee_payment_id,
                    'at_attendee_payment_id' => null,
                    'bt_attendee_id' => auth()->user()->id,
                    'at_attendee_id' => null,
                    'transfer_status' => 'pending',
                ]);
            }
        }

        return redirect()->back()->withSuccess('Emails submitted successfully!');
    }
}
