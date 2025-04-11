<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BadgePrintController extends Controller
{
    public function index(Request $request)
    {
        $attendees = Attendee::currentEvent()
            ->with(['payments.purchased_tickets'])
            ->get()
            ->map(function ($attendee) {
                return [
                    'name' => $attendee->first_name . ' ' . $attendee->last_name,
                    'position' => $attendee->position,
                    'qr_codes' => $attendee->payments
                        ->filter(fn($payment) => $payment->status === 'paid') // filter only paid payments
                        ->flatMap(function ($payment) {
                            return $payment->purchased_tickets->map(function ($ticket) {
                                return [
                                    'qr_code' => $ticket->qr_code !== 'EMPTY'
                                        ? asset('storage/' . $ticket->qr_code)
                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s',
                                    'ticket_name' => optional($ticket->ticket)->name,
                                ];
                            });
                        })
                        ->filter(function ($item) {
                            return !empty($item['qr_code']); // filter out any truly empty ones
                        })
                        ->values(),
                ];
            })
            ->filter(function ($item) {
                return $item['qr_codes']->isNotEmpty(); // Optional: only include attendees with QR codes
            })
            ->values();
        $eventApp = EventApp::find(session('event_id'));
        return Inertia::render('Organizer/Events/BadgePrint/Index', compact(
            'attendees',
            'eventApp'
        ));
    }
}
