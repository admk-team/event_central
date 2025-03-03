<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
    public function getEventDetail()
    {
        $events = [];
        return Inertia::render('Attendee/Index', compact('events'));
    }
    public function getEventDetailDashboard(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeaker']);
        return Inertia::render('Attendee/AttendeeDashboard', compact('eventApp'));
    }
    public function getEventDetailAgenda(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeaker']);
        return Inertia::render('Attendee/AttendeeAgenda', compact('eventApp'));
    }
    public function getEventSessionDetail(Request $request, EventApp $eventApp, EventSession $eventSession)
    {
        $eventSession->load(['eventSpeaker']);
        $selectedSessionDetails = DB::table('attendee_event_session')->where(function ($query) use ($eventApp, $eventSession) {
            $query->where('attendee_id', auth()->user()->id);
            $query->where('event_session_id', $eventSession->id);
        })->first();
        return Inertia::render('Attendee/AttendeeSessionDetail', compact(['eventApp', 'eventSession', 'selectedSessionDetails']));
    }
}
