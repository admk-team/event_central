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
                        ->flatMap(function ($payment) {
                            return $payment->purchased_tickets->pluck('qr_code');
                        })
                        ->filter()
                        ->map(function ($qr) {
                            return $qr !== 'EMPTY' ? asset('storage/' . $qr) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
                        })
                        ->values()
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
