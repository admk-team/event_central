<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Services\StripeService;
use Exception;

class StripeController extends Controller
{

    protected $stripe_payment_service;

    public function __construct(StripeService $stripePaymentService)
    {
        $this->stripe_payment_service = $stripePaymentService;
    }
}
