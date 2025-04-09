<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventTicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->where('attendee_payments.event_app_id', session('event_id'))
            ->select(
                'event_app_tickets.name as ticket_name',
                'attendee_purchased_tickets.total as total',
                'attendee_payments.amount_paid as amount',
                'attendee_payments.payment_method as type',
            'attendee_purchased_tickets.fees_sub_total as fees_sub_total',
            'attendee_purchased_tickets.addons_sub_total as addons_sub_total',
                'attendee_purchased_tickets.qty as qty',
            )->get();
        return Inertia::render('Organizer/Events/Tickets/EventAppTickets', compact(['tickets']));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
