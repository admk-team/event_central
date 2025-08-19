<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\OrganizerRefundRequest;
use App\Models\Attendee;
use App\Models\AttendeePayment;
use App\Models\AttendeeRefundTicket;
use App\Models\EventApp;
use App\Models\OrganizerPaymentKeys;
use App\Services\StripeService;
use Error;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Laravel\Prompts\table;

class RefundPaymentController extends Controller
{

    protected $stripe;
    public function __construct(StripeService $stripePaymentService,)
    {
        $this->stripe = $stripePaymentService;
    }

    public function refundTickets()
    {
        $eventApp = EventApp::findOrFail(Auth::user()->event_app_id ?? session('event_id'));
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);
        $refundPayments = $this->datatable(AttendeeRefundTicket::currentEvent()->with('attendee', 'attendeePayment'));
        // dd($refundPayments);
        return Inertia::render('Organizer/Events/RefundTickets/Index', compact('refundPayments','getCurrency'));
    }

    public function attendeeRefund(OrganizerRefundRequest $request)
    {
        $refund = AttendeeRefundTicket::findOrFail($request->refund_id);
        $refund->load('attendeePayment');
        if (!$refund) {
            return redirect()->back()->withError('Invalid Refund ID');
        }

        //Process Refund on Transfer
        if ($refund->attendeePayment->payment_method === 'stripe' && $request->action === 'approved') {
            $payment_intent = $refund->attendeePayment->stripe_id;
            $amount = $request->refund_approved_amount * 100;  //Converting to cents
            $result = $this->stripe->refund($refund->event_app_id, $payment_intent, $amount, [
                'refund_reason' => $refund->refund_reason,
                'organizer_remarks' => $request->organizer_remarks,
                'refund_requested_amount' => $refund->refund_requested_amount,
                'refund_id' => $refund->id,
                'organizer_id' => auth()->user()->id,
                'attendee_payment_id' => $refund->attendee_payment_id
            ]);

            if ($result && $result->status === 'succeeded') {
                $refund->update([
                    'stripe_refund_id' => $result->id,
                ]);
            } else {
                Log::info($result);
                throw new Exception('Error encounterd while processing stripe refund');
            }
        }

        // If organizer has approved refund request then remove all sessions
        // subscripted by each purchased tickets of payment
        if ($request->action === 'approved') {
            $attendee_payment = AttendeePayment::find($refund->attendee_payment_id);
            foreach ($attendee_payment->purchased_tickets as $purchase_ticket) {
                DB::table('attendee_event_session')->where('attendee_purchased_ticket_id', $purchase_ticket->id)->delete();
                $purchase_ticket->delete();
            }
        }

        //Either appoved or rejected update status of refund as selected by Organizer
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
