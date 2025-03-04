<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        // Finding previous and next session ids with reference to current session
        $next_session_id = null;
        $prev_session_id = null;
        $sessions = $eventApp->event_sessions->pluck('id');
        foreach ($sessions as $index => $value) {
            if ($value === $eventSession->id) {
                $prev_session_id = $index > 0 ? $sessions[$index - 1] : null;
                $next_session_id = $index < (count($sessions) - 1)  ? $sessions[$index + 1] : null;
            }
        }
        //---------
        $eventSession->load(['eventSpeaker']);
        $selectedSessionDetails = DB::table('attendee_event_session')->where(function ($query) use ($eventSession) {
            $query->where('attendee_id', auth()->user()->id);
            $query->where('event_session_id', $eventSession->id);
        })->first();
        return Inertia::render('Attendee/AttendeeSessionDetail', compact(['eventApp', 'eventSession', 'selectedSessionDetails', 'prev_session_id', 'next_session_id']));
    }

    public function getEventSpeakerDetail(Request $request, EventApp $eventApp, EventSpeaker $eventSpeaker)
    {
        // Log::info($eventSpeaker);
        $eventApp->load('event_speakers.eventSessions');

        // if (!$eventSpeaker) {
        //     $eventSpeaker = count($eventApp->event_speakers) > 0 ? $eventApp->event_speakers->first() : null;
        // }
        return Inertia::render('Attendee/AttendeeSpeakerDetail', compact(['eventApp', 'eventSpeaker']));
    }

    public function getEventDetailMore(Request $request, EventApp $eventApp)
    {
        return 'hello';
    }
}
