<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\OrganizerPaymentKeys;
use App\Models\AttendeePurchasedTicket;
use App\Models\AttendeePurchasedTickets;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UpgradeTicketToTicketController extends Controller
{
    protected $stripe_service;

    public function __construct(StripeService $stripeService)
    {
        $this->stripe_service = $stripeService;
    }

    /**
     * Show upgrade ticket-to-ticket page
     */
    public function index()
    {
        $eventApp = EventApp::find(session('event_id') ?? auth()->user()->event_app_id);

        $attendees = $eventApp->attendees()
            ->whereHas('attendeePurchasedTickets') // 👈 only attendees with at least one ticket
            ->select([
                'id as value',
                DB::raw("CONCAT(first_name, ' ', last_name, ' || ', email) as label")
            ])
            ->get();

        $tickets = $eventApp->tickets()->select('id', 'name', 'base_price')->get();
        $currency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        return Inertia::render('Organizer/Events/UpgradeTicketToTicket/UpgradeTicketToTicket', [
            'attendees' => $attendees,
            'tickets' => $tickets,
            'currency' => $currency,
        ]);
    }

    /**
     * Get purchased tickets for a specific attendee
     */
    public function getAttendeeTickets(Attendee $attendee)
    {
        $tickets = $attendee->attendeePurchasedTickets()->with('ticket')->get();
        return response()->json([
            'tickets' => $tickets
        ]);
    }

    /**
     * Proceed Stripe Checkout
     */
    public function proceedCheckout(Attendee $attendee, Request $request)
    {
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        $stripeResponse = $this->stripe_service->createPaymentIntent(
            $attendee->event_app_id,
            $amount,
            $currency
        );

        $stripeKeys = $this->stripe_service->StripKeys($attendee->event_app_id);

        return response()->json([
            'stripe_pub_key' => $stripeKeys->stripe_publishable_key,
            'client_secret' => $stripeResponse['client_secret'],
            'payment_id' => $stripeResponse['payment_id']
        ]);
    }

    /**
     * Save upgraded ticket
     */
    public function saveUpgrade(Attendee $attendee, Request $request)
    {
        $data = $request->validate([
            'old_ticket_id' => 'required|integer',
            'new_ticket_id' => 'required|integer|different:old_ticket_id',
            'amount' => 'nullable|numeric',
            'payment_method' => 'required|string',
            'note' => 'nullable|string',
            'stripe_payment_intent' => 'nullable|string',
            'stripe_payment_id' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            // Create Payment
            $payment = $attendee->attendeePayments()->create([
                'uuid' => Str::uuid(),
                'event_app_id' => $attendee->event_app_id,
                'attendee_id' => $attendee->id,
                'amount_paid' => $data['amount'] ?? 0,
                'payment_method' => $data['payment_method'],
                'organizer_payment_note' => $data['note'] ?? null,
                'stripe_intent' => $data['stripe_payment_intent'] ?? null,
                'stripe_id' => $data['stripe_payment_id'] ?? null,
                'status' => 'paid',
            ]);

            // Remove all old tickets (if multiple)
            AttendeePurchasedTickets::where('attendee_id', $attendee->id)
                ->where('event_app_ticket_id', $data['old_ticket_id'])
                ->delete();

            // Assign new ticket
            $attendee->attendeePurchasedTickets()->create([
                'event_app_ticket_id' => $data['new_ticket_id'],
                'price' => $data['amount'] ?? 0,
                'total' => $data['amount'] ?? 0,
                'attendee_payment_id' => $payment->id,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Ticket upgraded successfully.',
                'payment' => $payment
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);
            return response()->json([
                'message' => 'Upgrade failed. Please try again.'
            ], 500);
        }
    }

    /**
     * Success view
     */
    public function success($uuid)
    {
        return Inertia::render('Organizer/Events/UpgradeTicketToTicket/Success', [
            'organizerView' => true,
            'upgradeType' => 'ticket_to_ticket'
        ]);
    }
}
