<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Helpers\CsvExporter;
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

    public function exportRefundTicketData()
    {
        $refunds = AttendeeRefundTicket::currentEvent()
            ->with(['attendee', 'attendeePayment'])
            ->get()
            ->map(function ($refund) {
                return [
                    $refund->id,
                    $refund->attendee
                        ? $refund->attendee->first_name . ' ' . $refund->attendee->last_name
                        : '',
                    $refund->attendeePayment
                        ? '$' . $refund->attendeePayment->amount_paid
                        : '$0',
                    $refund->attendeePayment
                        ? $refund->attendeePayment->payment_method
                        : '',
                    '$' . $refund->refund_requested_amount,
                    $refund->refund_approved_amount > 0
                        ? '$' . $refund->refund_approved_amount
                        : '$0',
                    ucfirst($refund->status),
                ];
            })->toArray();

        return CsvExporter::export('refund_tickets_report.csv', [
            [
                'columns' => [
                    'ID',
                    'Attendee Name',
                    'Total Amount',
                    'Payment Method',
                    'Amount Requested',
                    'Refund Approved',
                    'Status',
                ],
                'rows' => $refunds,
            ]
        ]);
    }
}
