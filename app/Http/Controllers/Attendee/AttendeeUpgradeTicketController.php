<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpgradeTicketRequest;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendeeUpgradeTicketController extends Controller
{
    public function upgradeTickets($organizerView = null, $attendee_id = null)
    {
        $eventApp = null;
        $attendees = [];
        //If Page is being visited by Organizer
        if ($organizerView) {
            $eventApp = EventApp::find(session('event_id'));
            $attendees = $eventApp->attendees()->select(['id as value', DB::raw("CONCAT(first_name, ' ', last_name) as label")])->get();
        } else {
            $eventApp =  EventApp::find(auth()->user()->event_app_id);
        }
        $sessions = $eventApp->sessions;

        return Inertia::render('Attendee/UpgradeTickets/Index', compact([
            'organizerView',
            'attendees',
            'attendee_id',
            'sessions'
        ]));
    }

    public function saveTicketUpgrade(UpgradeTicketRequest $request, $organizerView = null)
    {
        //
    }

    public function getAttendeePurchasedTickets(Attendee $attendee)
    {
        $tickets =  $attendee->purchased_tickets();
        
        $attendee->load('attendeeEventSessions');

        $sessions = $attendee->attendeeEventSessions->pluck('event_session_id')->toArray();
        return response()->json([
            'tickets' => $tickets ,
            'sessions' => $sessions
        ]);
    }
}
