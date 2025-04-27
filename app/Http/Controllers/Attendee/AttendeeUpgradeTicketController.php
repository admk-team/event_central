<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\UpgradeTicketRequest;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendeeUpgradeTicketController extends Controller
{
    protected $stripe_service;
    public function __construct(StripeService $stripePaymentService)
    {
        $this->stripe_service = $stripePaymentService;
    }

    public function upgradeTickets($organizerView = null, $attendee_id = null)
    {
        $eventApp = null;
        $attendees = [];
        //If Page is being visited by Organizer
        if ($organizerView) {
            $eventApp = EventApp::find(session('event_id'));
            $attendees = $eventApp->attendees()->select(['id as value', DB::raw("CONCAT(first_name, ' ', last_name) as label")])->get();
        } else {
            $eventApp =  EventApp::find(auth()->user()->event_app_id);
        }
        $sessions = $eventApp->sessions;

        return Inertia::render('Attendee/UpgradeTickets/Index', compact([
            'organizerView',
            'attendees',
            'attendee_id',
            'sessions'
        ]));
    }

    public function saveUpgradedSessions(Attendee $attendee, UpgradeTicketRequest $request, $organizerView = null)
    {
        return $request->all();
    }

    public function getAttendeePurchasedTickets(Attendee $attendee)
    {
        $tickets =  $attendee->purchased_tickets();
        
        $attendee->load('attendeeEventSessions');

        $sessions = $attendee->attendeeEventSessions->pluck('event_session_id')->toArray();
        return response()->json([
            'tickets' => $tickets ,
            'sessions' => $sessions
        ]);
    }

    public function getStripPaymentIntent(Attendee $attendee, Request $request, $organizerView = false)
    {
        $amount = $request->input('amount');
        $stripe_response = $this->stripe_service->createPaymentIntent($attendee->event_app_id, $amount);
        $stripe_pub_key = $this->stripe_service->StripKeys($attendee->event_app_id)->stripe_publishable_key;
        $client_secret = $stripe_response['client_secret'];
        $payment_id = $stripe_response['payment_id'];
        return response()->json([
            'stripe_pub_key' => $stripe_pub_key,
            'client_secret' => $client_secret,
            'payment_id' => $payment_id
        ]);
    }

    public function showTicketUpgradeSuccess($uuid, $organizerView = null)
    {
        return Inertia::render('Attendee/UpgradeTickets/Success', [
            'organizerView' => $organizerView
        ]);
    }
}
