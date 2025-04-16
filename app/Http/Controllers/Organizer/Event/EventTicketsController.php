<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\OrganizerRefundRequest;
use App\Models\AttendeeRefundTicket;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EventTicketsController extends Controller
{
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

                'event_app_tickets.name as ticket_name',
                'attendee_purchased_tickets.total as total',
                'attendee_payments.amount_paid as amount',
                'attendee_payments.payment_method as type',
                'attendee_purchased_tickets.fees_sub_total as fees_sub_total',
                'attendee_purchased_tickets.addons_sub_total as addons_sub_total',
                'attendee_purchased_tickets.qty as qty',
                'attendees.id as attendee_id',
                'attendees.first_name as attendee_first_name',
                'attendees.last_name as attendee_last_name',
                'attendees.email as attendee_email',
                'attendee_payments.discount as discount',
                'attendee_payments.discount_code as promo_code',
            )
            ->get();
        return Inertia::render('Organizer/Events/Tickets/EventAppTickets', compact(['tickets']));
    }

    public function refundTickets()
    {
        $refundPayments = $this->datatable(AttendeeRefundTicket::currentEvent()->with('attendee', 'attendeePayment'));
        // dd($refundPayments);
        return Inertia::render('Organizer/Events/RefundTickets/Index', compact('refundPayments'));
    }

    public function attendeeRefund(OrganizerRefundRequest $request)
    {
        Log::info($request->all());

        $refund = AttendeeRefundTicket::findOrFail($request->refund_id);
        if (!$refund) {
            return redirect()->back()->withError('Invalid Refund ID');
        }

        $refund->update([
            'organizer_remarks' => $request->organizer_remarks,
            'refund_status_date' => $request->refund_status_date,
            'status' => $request->action,
            'refund_status_date' => now(),
            'refund_approved_amount' => $request->action === 'approved' ? $request->refund_approved_amount : 0
        ]);

        return redirect()->back()->withSuccess('Refund Processed successfuly');
    }
}
