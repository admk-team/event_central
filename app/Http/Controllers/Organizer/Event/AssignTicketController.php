<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Attendee\Payment\PaymentController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PayPalService;
use App\Services\StripeService;


class AssignTicketController extends Controller
{
    protected $stripe_service;
    protected $paypal_service;

    public function __construct(StripeService $stripePaymentService, PayPalService $payPalService)
    {
        $this->stripe_service = $stripePaymentService;
        $this->paypal_service = $payPalService;
    }

    public function assignTickets()
    {
        // dd(action([PaymentController::class, 'viewTickets']));
        $paymentController = new PaymentController($this->stripe_service, $this->paypal_service);
        return $paymentController->viewTickets(true);
    }
}
