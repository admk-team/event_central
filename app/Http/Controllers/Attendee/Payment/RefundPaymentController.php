<?php

namespace App\Http\Controllers\Attendee\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\RefundTicketRequest;
use App\Models\AttendeePayment;
use App\Models\AttendeeRefundTicket;
use Inertia\Inertia;


class RefundPaymentController extends Controller
{
    public function refundAttendeeTicket()
    {
        $attendee = auth()->user();
        $payments = $this->datatable(AttendeePayment::where('attendee_id', $attendee->id)
            ->where('status', 'paid')->with('refund_tickets'));

        // return $payments;
        return Inertia::render('Attendee/Refund/Index', [
            'payments' => $payments,
        ]);
    }

    public function refundAttendeeRequest(RefundTicketRequest $request)
    {
        // return $request->all();
        $paymentId = $request->payment_id;
        $attendeePayment = AttendeePayment::where('id', $paymentId)
            ->where('status', 'paid')
            ->first();

        if (!$attendeePayment) {
            return redirect()->back()->withError('Invalid Payment ID or Payment not found!');
        }

        $attendee = auth()->user();
        $checkRefund = AttendeeRefundTicket::where('attendee_payment_id', $attendeePayment->id)
            ->where('attendee_id', $attendee->id)
            ->exists();

        if ($checkRefund) {
            return redirect()->back()->with('error', 'Refund request already submitted!');
        } else {
            AttendeeRefundTicket::create([
                'attendee_payment_id' => $attendeePayment->id,
                'attendee_id' => $attendee->id,
                'event_app_id' => $attendeePayment->event_app_id,
                'status' => 'pending',
                'refund_requested_on' => now(),
                'refund_reason' => $request->refund_reason,
                'refund_type' => $request->refund_type,
                'refund_requested_amount' => $request->refund_requested_amount,
            ]);
        }

        return redirect()->back()->withSuccess('Refund request submitted successfully!');
    }
}
