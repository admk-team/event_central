<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Http\Controllers\Controller;
use App\Models\AttendeeRefundTicket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RefundTicketReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_refund_ticket_report')) {
            abort(403);
        }
        $refundPayments = $this->datatable(AttendeeRefundTicket::currentEvent()->with('attendee', 'attendeePayment'));
        return Inertia::render('Organizer/Events/Reports/RefundTicket/Index', compact('refundPayments'));
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
