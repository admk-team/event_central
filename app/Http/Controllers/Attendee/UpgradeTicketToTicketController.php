<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\AttendeePurchasedTickets;
use App\Models\OrganizerPaymentKeys;
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
     * Show upgrade page for logged-in attendee
     */
    public function index()
    {
        $attendee = auth()->user(); // 👈 current attendee
        $eventApp = EventApp::findOrFail($attendee->event_app_id);

        $tickets = $eventApp->tickets()->orderBy('position', 'asc')
            ->select('id', 'name', 'base_price')
            ->get();

        $currency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        // Get attendee’s purchased tickets
        $attendeeTickets = $attendee->attendeePurchasedTickets()->with('ticket')->get();

        return Inertia::render('Attendee/UpgradeTicketToTicket/Index', [
            'attendee' => $attendee,
            'attendeeTickets' => $attendeeTickets,
            'tickets' => $tickets,
            'currency' => $currency,
        ]);
    }

    /**
     * Proceed with Stripe checkout
     */
    public function proceedCheckout(Request $request)
    {
        $attendee = auth()->user();
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'required|string',
        ]);

        $stripeResponse = $this->stripe_service->createPaymentIntent(
            $attendee->event_app_id,
            $validated['amount'],
            $validated['currency']
        );

        $stripeKeys = $this->stripe_service->StripKeys($attendee->event_app_id);

        return response()->json([
            'stripe_pub_key' => $stripeKeys->stripe_publishable_key,
            'client_secret' => $stripeResponse['client_secret'],
            'payment_id' => $stripeResponse['payment_id']
        ]);
    }

    /**
     * Save the upgraded ticket
     */
    public function saveUpgrade(Request $request)
    {
        $attendee = auth()->user();
        $data = $request->validate([
            'old_ticket_id' => 'required|integer',
            'new_ticket_id' => 'required|integer|different:old_ticket_id',
            'amount' => 'nullable|numeric|min:0',
            'payment_method' => 'required|string',
            'note' => 'nullable|string|max:255',
            'stripe_payment_intent' => 'nullable|string',
            'stripe_payment_id' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $oldTicket = EventAppTicket::findOrFail($data['old_ticket_id']);
            $newTicket = EventAppTicket::findOrFail($data['new_ticket_id']);

            $oldPrice = (float) $oldTicket->base_price;
            $newPrice = (float) $newTicket->base_price;
            $difference = $newPrice - $oldPrice;

            // 🚫 Prevent downgrades
            if ($difference <= 0) {
                return response()->json([
                    'message' => 'Downgrade not allowed. You can only upgrade to a higher-priced ticket.'
                ], 422);
            }

            // ✅ Create Payment record (difference amount)
            $payment = $attendee->attendeePayments()->create([
                'uuid' => Str::uuid(),
                'event_app_id' => $attendee->event_app_id,
                'attendee_id' => $attendee->id,
                'amount_paid' => $difference,
                'payment_method' => $data['payment_method'],
                'organizer_payment_note' => $data['note'] ?? null,
                'stripe_intent' => $data['stripe_payment_intent'] ?? null,
                'stripe_id' => $data['stripe_payment_id'] ?? null,
                'status' => 'paid',
                'is_refund_required' => false,
            ]);

            // ✅ Create new upgraded ticket
            $attendee->attendeePurchasedTickets()->create([
                'event_app_ticket_id'   => $data['new_ticket_id'],
                'price'                 => $newPrice,
                'total'                 => $newPrice,
                'original_ticket_price' => $oldPrice,
                'upgrade_amount'        => $difference,
                'attendee_payment_id'   => $payment->id,
                'is_upgrade'            => true,
            ]);

            // ✅ Remove old ticket
            AttendeePurchasedTickets::where('attendee_id', $attendee->id)
                ->where('event_app_ticket_id', $data['old_ticket_id'])
                ->delete();

            DB::commit();

            return response()->json([
                'message' => 'Ticket upgraded successfully.',
                'payment' => $payment,
                'financial_summary' => [
                    'original_price' => $oldPrice,
                    'upgrade_difference' => $difference,
                    'new_ticket_price' => $newPrice,
                    'amount_paid_now' => $difference,
                ],
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);

            return response()->json([
                'message' => 'Upgrade failed. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Success page after upgrade
     */
    public function success($uuid)
    {
        return Inertia::render('Attendee/UpgradeTicketToTicket/Success', [
            'upgradeType' => 'ticket_to_ticket',
        ]);
    }
}
