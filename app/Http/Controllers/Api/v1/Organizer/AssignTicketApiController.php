<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Attendee\Payment\PaymentController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\AttendeeCheckoutRequest;
use App\Models\Attendee;
use App\Models\AttendeePayment;
use App\Models\EventApp;
use App\Services\PayPalService;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AssignTicketApiController extends Controller
{
    protected $paymentController;
    protected $stripe_service;
    protected $paypal_service;

    public function __construct(StripeService $stripePaymentService, PayPalService $payPalService)
    {
        $this->paymentController = new PaymentController($stripePaymentService, $payPalService);
        $this->stripe_service = $stripePaymentService;
        $this->paypal_service = $payPalService;
    }

    public function assignTickets(EventApp $event)
    {
        if (!Auth::user()->can('assign_tickets')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $eventApp = null;
        $attendees = [];
        $eventApp = $event ? $event : null;

        if (!$eventApp) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $attendees = $eventApp->attendees()->select(['id as value',DB::raw("CONCAT(first_name, ' ', last_name) as label")])->get();
        $eventApp->load([
            'tickets.sessions',
            'tickets.addons',
            'tickets.fees'
        ]);

        return response()->json([
            'eventApp' => $eventApp,
            'attendees' => $attendees,
        ]);
    }

    public function checkout(AttendeeCheckoutRequest $request, Attendee $attendee, $payment_method)
    {
        $payment = $this->paymentController->checkout($request, true, $attendee, $payment_method);
        return response()->json($payment);
    }

    public function checkoutFreeTicket(AttendeeCheckoutRequest $request, Attendee $attendee, $payment_method)
    {
        $payment = $this->paymentController->checkoutFreeTicket($request, true, $attendee, $payment_method);
        return response()->json($payment);
    }

    public function showCheckoutPage($paymentUuId)
    {
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        if ($payment->status !== 'pending') {
            return response()->json(['error' => 'Payment has already been processed'], 400);
        }

        $stripe_pub_key = $this->stripe_service->StripKeys($payment->event_app_id)->stripe_publishable_key;
        $paypal_client_id = null; // Adjust if PayPal keys are needed

        return response()->json([
            'payment' => $payment,
            'stripe_pub_key' => $stripe_pub_key,
            'paypal_client_id' => $paypal_client_id,
        ]);
    }

    public function updateAttendeePayment($paymentUuId)
    {
        $result = $this->paymentController->updateAttendeePaymnet($paymentUuId);
        return response()->json($result);
    }

    public function paymentSuccess($paymentUuId)
    {
        $payment = AttendeePayment::where('uuid', $paymentUuId)->first();

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        return response()->json([
            'message' => 'Payment successful',
            'payment' => $payment,
        ]);
    }

    public function validateDiscCode($disCode)
    {
        try {
            $result = $this->paymentController->validateDiscCode($disCode);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}