<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use App\Mail\AttendeeTicketPurchasedEmail;
use App\Models\AttendeePayment;
use App\Services\StripeService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class EventTicketsController extends Controller
{
    protected $stripe;
    public function __construct(StripeService $stripePaymentService,)
    {
        $this->stripe = $stripePaymentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_payments')) {
            abort(403);
        }

        $tickets = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->join('attendees', 'attendees.id', '=', 'attendee_payments.attendee_id')
            ->where('attendee_payments.event_app_id', session('event_id'))
            ->where('attendee_payments.status', 'paid')
            ->select(
                'attendee_payments.id as ticketId',
                'attendee_payments.confirmation_number as confirmation_number',
                'event_app_tickets.name as ticket_name',
                DB::raw('SUM(attendee_purchased_tickets.total) as total'),
                'attendee_payments.amount_paid as amount',
                'attendee_payments.organizer_payment_note as payment_note',
                'attendee_payments.created_at',
                'attendee_payments.payment_method as type',
                DB::raw('SUM(attendee_purchased_tickets.fees_sub_total) as fees_sub_total'),
                DB::raw('SUM(attendee_purchased_tickets.addons_sub_total) as addons_sub_total'),
                DB::raw('SUM(attendee_purchased_tickets.qty) as qty'),
                'attendees.id as attendee_id',
                'attendees.first_name as attendee_first_name',
                'attendees.last_name as attendee_last_name',
                'attendees.email as attendee_email',
                'attendee_payments.discount as discount',
                'attendee_payments.discount_code as promo_code',

                // 👇 Added upgrade-related columns
                DB::raw('MAX(attendee_purchased_tickets.original_ticket_price) as original_price'),
                DB::raw('MAX(attendee_purchased_tickets.upgrade_amount) as upgrade_amount'),
                DB::raw('MAX(attendee_purchased_tickets.is_upgrade) as is_upgrade'),
                DB::raw('MAX(attendee_payments.is_refund_required) as refund_required')
            )
            ->groupBy(
                'attendee_payments.id',
                'attendee_payments.confirmation_number',
                'event_app_tickets.id',
                'event_app_tickets.name',
                'attendee_payments.amount_paid',
                'attendee_payments.organizer_payment_note',
                'attendee_payments.created_at',
                'attendee_payments.payment_method',
                'attendees.id',
                'attendees.first_name',
                'attendees.last_name',
                'attendees.email',
                'attendee_payments.discount',
                'attendee_payments.discount_code'
            )
            ->latest()
            ->get();

        return Inertia::render('Organizer/Events/Tickets/EventAppTickets', compact(['tickets']));
    }

    /**
     * Resend the purchase confirmation email to the attendee for the given payment.
     */
    public function resendPurchaseEmail(AttendeePayment $attendeepayment)
    {
        if (! Auth::user()->can('view_payments')) {
            abort(403);
        }

        $attendeepayment->load(['attendee', 'purchased_tickets.ticket', 'purchased_tickets.purchased_addons', 'purchased_tickets.payment']);

        if ($attendeepayment->event_app_id != session('event_id')) {
            abort(403);
        }

        Mail::to($attendeepayment->attendee->email)->send(
            new AttendeeTicketPurchasedEmail(
                $attendeepayment->attendee,
                $attendeepayment->purchased_tickets,
                $attendeepayment
            )
        );

        return redirect()->back()->with('success', __('Purchase confirmation email has been resent to :email.', ['email' => $attendeepayment->attendee->email]));
    }

    public function deleteTickets(AttendeePayment $attendeepayment)
    {
        // Calculate total quantity across all purchased tickets
        $totalQuantity = $attendeepayment->purchased_tickets->sum('qty');

        // If total quantity is more than 1, decrement by 1
        if ($totalQuantity > 1) {
            // Find the first ticket with qty > 0 and decrement it
            foreach ($attendeepayment->purchased_tickets as $purchase_ticket) {
                if ($purchase_ticket->qty > 1) {
                    // Decrement quantity by 1
                    $purchase_ticket->decrement('qty');
                    
                    // Calculate refund amount for one ticket
                    $refundAmount = ($purchase_ticket->total / ($purchase_ticket->qty + 1)); // +1 because we already decremented
                    
                    // Update the total for this ticket
                    $purchase_ticket->total = $purchase_ticket->total - $refundAmount;
                    $purchase_ticket->save();
                    
                    // Update the payment amount_paid
                    $attendeepayment->amount_paid = $attendeepayment->amount_paid - $refundAmount;
                    $attendeepayment->save();
                    
                    // Process partial refund if payment method is stripe
                    if ($attendeepayment->payment_method === 'stripe') {
                        $payment_intent = $attendeepayment->stripe_intent;
                        $amount = $refundAmount * 100;  // Converting to cents
                        $this->stripe->refund($attendeepayment->event_app_id, $payment_intent, $amount, [
                            'refund_reason' => "Partial Ticket Refund",
                            'organizer_remarks' => "Deleted 1 ticket from quantity",
                            'refund_requested_amount' => $amount,
                            'organizer_id' => auth()->user()->id,
                        ]);
                    }
                    
                    return redirect()->back()->withSuccess('One ticket deleted successfully from quantity');
                } elseif ($purchase_ticket->qty == 1 && $attendeepayment->purchased_tickets->count() > 1) {
                    // If this ticket has qty=1 but there are other tickets, delete this one
                    DB::table('attendee_event_session')->where('attendee_purchased_ticket_id', $purchase_ticket->id)->delete();
                    
                    $refundAmount = $purchase_ticket->total;
                    
                    // Update the payment amount_paid
                    $attendeepayment->amount_paid = $attendeepayment->amount_paid - $refundAmount;
                    $attendeepayment->save();
                    
                    // Process partial refund if payment method is stripe
                    if ($attendeepayment->payment_method === 'stripe') {
                        $payment_intent = $attendeepayment->stripe_intent;
                        $amount = $refundAmount * 100;  // Converting to cents
                        $this->stripe->refund($attendeepayment->event_app_id, $payment_intent, $amount, [
                            'refund_reason' => "Partial Ticket Refund",
                            'organizer_remarks' => "Deleted ticket",
                            'refund_requested_amount' => $amount,
                            'organizer_id' => auth()->user()->id,
                        ]);
                    }
                    
                    $purchase_ticket->delete();
                    return redirect()->back()->withSuccess('Ticket deleted successfully');
                }
            }
        } else {
            // If total quantity is 1, delete the entire payment and all tickets
            // Process full refund if payment method is stripe
            if ($attendeepayment->payment_method === 'stripe') {
                $payment_intent = $attendeepayment->stripe_intent;
                $amount = $attendeepayment->amount_paid * 100;  // Converting to cents
                $this->stripe->refund($attendeepayment->event_app_id, $payment_intent, $amount, [
                    'refund_reason' => "Ticket Refunded",
                    'organizer_remarks' => "Deleted Ticket",
                    'refund_requested_amount' => $amount,
                    'organizer_id' => auth()->user()->id,
                ]);
            }

            // Delete all sessions and tickets
            foreach ($attendeepayment->purchased_tickets as $purchase_ticket) {
                DB::table('attendee_event_session')->where('attendee_purchased_ticket_id', $purchase_ticket->id)->delete();
                $purchase_ticket->delete();
            }

            return redirect()->back()->withSuccess('Payment deleted successfully');
        }
    }
}
