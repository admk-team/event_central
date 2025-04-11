<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Attendee\Payment\PaymentController;
use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Services\PayPalService;
use App\Services\StripeService;

class AssignTicketController extends Controller
{
    protected $paymentController;

    public function __construct(StripeService $stripePaymentService, PayPalService $payPalService)
    {
        $this->paymentController = new PaymentController($stripePaymentService, $payPalService);
    }

    public function assignTickets()
    {
        return $this->paymentController->viewTickets(true);
    }

    public function checkout(Request $request, Attendee $attendee, $paymnet_method)
    {
        return $this->paymentController->checkout($request, true, $attendee, $paymnet_method);
    }

    public function showCheckoutPage($paymentUuId)
    {
        return $this->paymentController->showCheckoutPage($paymentUuId, true);
    }

    public function updateAttendeePaymnet($paymentUuId)
    {
        return $this->paymentController->updateAttendeePaymnet($paymentUuId);
    }

    public function paymentSuccess($paymentUuId)
    {
        return $this->paymentController->paymentSuccess($paymentUuId, true);
    }

    public function validateDiscCode($disCode)
    {
        return $this->paymentController->validateDiscCode($disCode);
    }
}
