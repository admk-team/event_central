<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\EventPost;
use App\Models\EventSpeaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{

    public function getEventDetailDashboard(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeaker', 'event_sessions.event_platform']);

        return Inertia::render('Attendee/AttendeeDashboard', compact([
            'eventApp',
        ]));
    }

    public function getEventDetailAgenda(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeaker', 'event_sessions.event_platform']);
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
        //------------------------------------------------------------------------
        $eventSession->load(['eventSpeaker']);
        $selectedSessionDetails = DB::table('attendee_event_session')->where(function ($query) use ($eventSession) {
            $query->where('attendee_id', auth()->user()->id);
            $query->where('event_session_id', $eventSession->id);
        })->first();

        return Inertia::render('Attendee/AttendeeSessionDetail', compact([
            'eventApp',
            'eventSession',
            'selectedSessionDetails',
            'prev_session_id',
            'next_session_id',
            'prev_url'
        ]));
    }

    public function getEventSpeakerDetail(EventApp $eventApp, EventSpeaker $eventSpeaker)
    {
        $eventApp->load('event_speakers.eventSessions');

        if ($eventSpeaker) {
            $eventSpeaker->load('eventSessions');
        }
        return Inertia::render('Attendee/AttendeeSpeakerDetail', compact(['eventApp', 'eventSpeaker']));
    }

    public function getEventDetailMore(EventApp $eventApp)
    {
        $eventApp->load('organiser');
        return Inertia::render('Attendee/AttendeeMore', compact(['eventApp']));
    }

    public function getPostsMore(EventApp $eventApp)
    {
        $newsfeeds = EventPost::where('event_app_id',Auth::user()->event_app_id)->get();
        return Inertia::render('Attendee/Posts/Index', compact(['eventApp','newsfeeds']));
    }
}
