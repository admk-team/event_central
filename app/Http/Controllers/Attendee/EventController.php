<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\EventPost;
use App\Models\EventSpeaker;
use App\Models\SessionCheckIn;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{

    public function getEventDetailDashboard()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform']);
        return Inertia::render('Attendee/AttendeeDashboard', compact([
            'eventApp',
        ]));
    }

    public function getEventDetailAgenda()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp->load([
            'event_sessions.eventSpeakers',
            'event_sessions.eventPlatform'
        ]);

        return Inertia::render('Attendee/AttendeeAgenda', compact('eventApp'));
    }

    public function getEventSessionDetail(Request $request, EventSession $eventSession)
    {
        $checkin = SessionCheckIn::where('attendee_id',auth()->user()->id)->where('session_id',$eventSession->id)->exists();
        $eventApp = EventApp::find(Auth::user()->event_app_id);

        // Finding previous and next session IDs with reference to current session
        $next_session_id = null;
        $prev_session_id = null;
        $sessions = $eventApp->event_sessions->pluck('id');
        foreach ($sessions as $index => $value) {
            if ($value === $eventSession->id) {
                $prev_session_id = $index > 0 ? $sessions[$index - 1] : null;
                $next_session_id = $index < (count($sessions) - 1) ? $sessions[$index + 1] : null;
            }
        }

        // Note: After upgrading to Laravel 11, the above code can be replaced with:
        // $next_session_id = $sessions->after($eventSession->id);
        // $prev_session_id = $sessions->before($eventSession->id);

        $eventSession->load(['eventSpeakers', 'attendees', 'eventDate', 'eventPlatform']);
        $selectedSessionDetails = DB::table('attendee_event_session')
            ->where(function ($query) use ($eventSession) {
                $query->where('attendee_id', auth()->user()->id);
                $query->where('event_session_id', $eventSession->id);
            })
            ->first();
        return Inertia::render('Attendee/AttendeeSessionDetail', compact([
            'eventApp',
            'eventSession',
            'selectedSessionDetails',
            'prev_session_id',
            'next_session_id',
            'checkin',
        ]));
    }

    public function getEventSpeakerDetail(EventSpeaker $eventSpeaker)
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);

        // Load all speakers and their sessions for the event
        $eventApp->load(['event_speakers' => function ($query) {
            $query->with('eventSessions.eventPlatform'); // Load sessions for all speakers
        }]);

        // Load sessions for the specific speaker
        if ($eventSpeaker) {
            $eventSpeaker->load('eventSessions.eventPlatform');
        }

        return Inertia::render('Attendee/AttendeeSpeakerDetail', compact('eventApp', 'eventSpeaker'));
    }

    public function getEventDetailMore()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp->load('organiser');
        return Inertia::render('Attendee/AttendeeMore', compact(['eventApp']));
    }

    public function getPostsMore(String $id)
    {
        $attendee= Auth::user()->id;
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $newsfeeds = EventPost::where('event_app_id', $eventApp->id)->where('session_id',$id)->get();
        return Inertia::render('Attendee/Posts/Index', compact(['eventApp', 'newsfeeds','attendee']));
    }
}
