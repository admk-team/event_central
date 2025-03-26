<?php

namespace App\Http\Controllers;

use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\Question;
use Illuminate\Http\Request;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use chillerlan\QRCode\Common\EccLevel;
use chillerlan\QRCode\Output\QRImage;
use Illuminate\Support\Facades\Storage;

class AnswerController extends Controller
{
    public function store(Request $request, Question $question)
    {
        $request->validate(['content' => 'required|string|max:1000']);

        $answer = $question->answers()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return response()->json($answer->load('user'));
    }

    public function generate(Request $request)
    {
        $qrData = "";
        $event = null;
        $attendee = auth()->user();
        $attendee->load('payments');
        if (count($attendee->payments)) {
            $payment = $attendee->payments[0];
            $event = EventApp::find($payment->event_app_id);

            $qrData .= "payment_id : " . $payment->id . "\n";
            $qrData .= "event_uuid : " . $event->uuid . "\n";
            $qrData .= "Event Name : " . $event->name . "\n";
            $qrData .= "Start Date : " . $event->start_date . "\n";
            $qrData .= "End Date : " . $event->end_date . "\n";
            $qrData .= "Amount Paid : " . $payment->amount_paid . "\n";
            $qrData .= "\n";
            $qrData .= "Tickets: " . "\n";
            foreach ($payment->purchased_tickets as $ticket_purchased) {
                $ticket = EventAppTicket::find($ticket_purchased->event_app_ticket_id);
                $qrData .= " ticket_id: " . $ticket_purchased->event_app_ticket_id . "\n";
                $qrData .= " Name: " . $ticket->name . "\n";
                $qrData .= " Ticket Sessions: \n";
                foreach ($ticket->sessions as $session) {
                    $qrData .= "  session_id: " . $session->id . "\n";
                }
            }
        }

        $options = new QROptions([
            // 'version' => 5,
            'eccLevel' => EccLevel::L,
            'scale' => 5,
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'imageBase64' => false,
        ]);

        $qrcode = new QRCode($options);

        // Clear any buffer to avoid output issues
        if (ob_get_length()) {
            ob_end_clean();
        }

        Storage::put('public/qr-codes/' . $attendee->id . '.png', $qrcode->render(
            $qrData
        ));

        return view('attendee-pass', compact(['attendee', 'event']));
        // return response($qrcode->render($qrData))
        //     ->header('Content-Type', 'image/png');
    }
}
