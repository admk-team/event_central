<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index(EventApp $event)
    {
        if (! Auth::user()->can('view_payments')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $tickets = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->join('attendees', 'attendees.id', '=', 'attendee_payments.attendee_id')
            ->where('attendee_payments.event_app_id', $event->id)
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
            
        return $tickets;
    }
    public function search(EventApp $event, Request $request)
    {
        // Check if user has permission to view payments
        if (!Auth::user()->can('view_payments')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        // Get query parameters
        $search = $request->query('search');

        // Build the query
        $query = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->join('attendees', 'attendees.id', '=', 'attendee_payments.attendee_id')
            ->where('attendee_payments.event_app_id', $event->id)
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
                'attendee_payments.discount_code as promo_code'
            );

        // Apply search filter if provided
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('event_app_tickets.name', 'like', '%' . $search . '%')
                  ->orWhere('attendees.first_name', 'like', '%' . $search . '%')
                  ->orWhere('attendees.last_name', 'like', '%' . $search . '%')
                  ->orWhere('attendee_payments.payment_method', 'like', '%' . $search . '%')
                  ->orWhereRaw('CAST(attendee_purchased_tickets.total AS CHAR) LIKE ?', ['%' . $search . '%']);
            });
        }

        // Execute query
        $tickets = $query->get();

        // Return raw collection
        return $tickets;
    }
}
