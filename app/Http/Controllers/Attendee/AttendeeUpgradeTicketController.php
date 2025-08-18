<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\UpgradeTicketRequest;
use App\Models\Attendee;
use App\Models\AttendeeEventSession;
use App\Models\EventApp;
use App\Models\OrganizerPaymentKeys;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
        $purchasedTickets = [];
        //If Page is being visited by Organizer
        if ($organizerView) {
            $eventApp = EventApp::find(session('event_id'));
            $attendees = $eventApp->attendees()->select(['id as value', DB::raw("CONCAT(first_name, ' ', last_name) as label")])->get();
            $getCurrency = OrganizerPaymentKeys::where('user_id',auth()->user()->id)->value('currency');

        } else {
            $eventApp =  EventApp::find(auth()->user()->event_app_id);
            $getCurrency = OrganizerPaymentKeys::where('user_id',$eventApp->organizer_id)->value('currency');
            $purchasedTickets = auth()->user()->purchased_tickets();
            $attendee_id = auth()->user()->id;
        }
        $sessions = $eventApp->sessions;

        return Inertia::render('Attendee/UpgradeTickets/Index', compact([
            'organizerView',
            'attendees',
            'attendee_id',
            'sessions',
            'purchasedTickets',
            'getCurrency'
        ]));
    }

    public function saveUpgradedSessions(Attendee $attendee, UpgradeTicketRequest $request, $organizerView = null)
    {
        $data =  $request->all();

        if ($organizerView) {
            $user = auth()->user();
        } else {
            $user = $attendee;
        }
        // DB::beginTransaction();

        $payment = $user->attendeePayments()->create([
            'uuid' => Str::uuid(),
            'event_app_id' => $attendee->event_app_id,
            'attendee_id' => $attendee->id,
            'discount_code' => $data['discount_code'],
            'sub_total' => $data['subTotal'],
            'discount' => $data['discount'],
            'amount_paid' => $data['totalAmount'],
            'stripe_intent' => $data['stripe_payment_intent'],
            'stripe_id' => $data['stripe_payment_id'],
            'organizer_payment_note' => $data['organizer_payment_note'] ?? null,
            'payment_method' => $organizerView ? $data['payment_method'] : 'stripe',
            'status' => 'paid',
        ]);
        foreach ($data['upgradedSessionIds'] as $sessionId) {
            AttendeeEventSession::create([
                'attendee_id' => $attendee->id,
                'event_session_id' => $sessionId,
                'attendee_purchased_ticket_id' => $data['attendee_purchased_ticket_id'],
                'attendee_payment_id' => $payment->id,
            ]);
        }
        return response()->json([
            'message' => 'Attendee sessions have been upgraded successfully',
            'payment' => $payment
        ]);
    }

    public function saveUpgradedSessionsFree(Attendee $attendee, UpgradeTicketRequest $request, $organizerView = null)
    {
        $data =  $request->all();
        if ($organizerView) {
            $user = auth()->user();
        } else {
            $user = $attendee;
        }

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
            'organizer_payment_note' => $data['organizer_payment_note'] ?? null,
            'payment_method' => $data['payment_method'],
            'status' => 'paid',
        ]);
        foreach ($data['upgradedSessionIds'] as $sessionId) {
            AttendeeEventSession::create([
                'attendee_id' => $attendee->id,
                'event_session_id' => $sessionId,
                'attendee_purchased_ticket_id' => $data['attendee_purchased_ticket_id'],
                'attendee_payment_id' => $payment->id,
            ]);
        }
        return response()->json([
            'message' => 'Attendee sessions have been upgraded successfully',
            'payment' => $payment
        ]);
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

    public function getAttendeePurchasedTicketSessions($purchasedTicketId)
    {
        return response()->json([
            'sessions' => AttendeeEventSession::where('attendee_purchased_ticket_id', $purchasedTicketId)->pluck('event_session_id')
        ]);
    }

    public function getStripPaymentIntent(Attendee $attendee, Request $request, $organizerView = false)
    {
        $amount = $request->input('amount');
        $stripe_response = $this->stripe_service->createPaymentIntent($attendee->event_app_id, $amount,$request->input('currency'));
        $stripe_pub_key = $this->stripe_service->StripKeys($attendee->event_app_id)->stripe_publishable_key;

        Log::info($stripe_response);
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
