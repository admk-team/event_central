<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
            'attendee_payments.organizer_payment_note as payment_note',
            'attendee_payments.created_at',
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
}
