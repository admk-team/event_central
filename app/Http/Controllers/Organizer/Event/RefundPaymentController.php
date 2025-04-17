<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\OrganizerRefundRequest;
use App\Models\AttendeeRefundTicket;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RefundPaymentController extends Controller
{
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
