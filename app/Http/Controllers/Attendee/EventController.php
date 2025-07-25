<?php

namespace App\Http\Controllers\Attendee;

use Inertia\Inertia;
use App\Models\Track;
use App\Models\EventApp;
use App\Models\EventPost;
use App\Models\EventAppDate;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use App\Models\EventPlatform;
use App\Models\SessionRating;
use App\Models\SessionCheckIn;
use App\Models\AttendeeFavSession;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Api\AttendeeFavSessionResource;
use App\Models\AttendeeContactForm;
use Carbon\Carbon;

class EventController extends Controller
{

    public function getEventDetailDashboard()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform', 'dates']);
        $eventApp->setRelation(
            'event_sessions',
            $eventApp->event_sessions->filter(function ($session) {
                return $session->is_favourite === true;
            })->values()
        );
        return Inertia::render('Attendee/AttendeeDashboard', compact([
            'eventApp',
        ]));
    }

    public function allfavouriteSession()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);

        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform', 'dates']);
        // dump($eventApp->event_sessions->pluck('id')->toArray());
        $eventApp->event_sessions = $eventApp->event_sessions->sort(function ($a, $b) {

            $startA = Carbon::parse($a->start_date_time);
            $startB = Carbon::parse($b->start_date_time);

            return $startA->greaterThan($startB) ? 1 : ($startA->lessThan($startB) ? -1 : 0);
        });
        // dd($eventApp->event_sessions->pluck('id')->toArray());

        return Inertia::render('Attendee/Favourite/Index', compact([
            'eventApp',
        ]));
    }

    public function getEventDetailAgenda()
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);

        $eventdates = EventAppDate::where('event_app_id', $eventApp->id)->with('eventSessions')->get();
        $tracks = Track::where('event_app_id', $eventApp->id)->get();
        $enableTracks = eventSettings($eventApp->id)->getValue('enable_tracks', false);
        $eventPlatforms = EventPlatform::where('event_app_id', $eventApp->id)->get();
        $eventApp->load([
            'event_sessions' => [
                'eventSpeakers',
                'eventPlatform',
                'tracks',
            ]
        ]);
        return Inertia::render('Attendee/AttendeeAgenda', compact('eventApp', 'eventdates', 'tracks', 'enableTracks', 'eventPlatforms'));
    }

    public function getEventSessionDetail(Request $request, EventSession $eventSession)
    {
        $checkin = SessionCheckIn::where('attendee_id', auth()->user()->id)->where('session_id', $eventSession->id)->exists();
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

        $eventSession->load(['eventSpeakers', 'attendees', 'eventDate', 'eventPlatform', 'attendeesRating']);
        $selectedSessionDetails = DB::table('attendee_event_session')
            ->where(function ($query) use ($eventSession) {
                $query->where('attendee_id', auth()->user()->id);
                $query->where('event_session_id', $eventSession->id);
            })
            ->first();
        $attendeeRating = SessionRating::where('attendee_id', auth()->user()->id)
            ->where('event_session_id', $eventSession->id)->first();
        return Inertia::render('Attendee/AttendeeSessionDetail', compact([
            'eventApp',
            'eventSession',
            'selectedSessionDetails',
            'prev_session_id',
            'next_session_id',
            'checkin',
            'attendeeRating',
        ]));
    }

    public function getEventSpeakerDetail(EventSpeaker $eventSpeaker)
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);

        // Load all speakers and their sessions for the event, sorted by name
        $eventApp->load(['event_speakers' => function ($query) {
            $query->with('eventSessions.eventPlatform')->orderBy('name'); // Sort speakers alphabetically
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

    public function submitContectForm(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'content' => 'required',
            'event_app_id' => 'required',
        ]);
        $attendee = Auth::user();

        if ($attendee) {
            AttendeeContactForm::create([
                'event_id' => $request->event_app_id,
                'attendee_id' => $attendee->id,
                'subject' => $request->subject,
                'content' => $request->content,
            ]);
            return back()->withSuccess("Form Submitted Successfully");
        }
    }

    public function getPostsMore(String $id)
    {
        $attendee = Auth::user()->id;
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $newsfeeds = EventPost::where('event_app_id', $eventApp->id)->where('session_id', $id)->get();
        return Inertia::render('Attendee/Posts/Index', compact(['eventApp', 'newsfeeds', 'attendee']));
    }

    public function favsession($sessionid)
    {
        $attendee = auth()->user();

        $alreadyfav = AttendeeFavSession::where('attendee_id', $attendee->id)->where('event_session_id', $sessionid)->first();

        if ($alreadyfav) {
            $toggelAlreadyFav = $alreadyfav->fav;
            if ($toggelAlreadyFav == 1) {
                $toggelAlreadyFav = 0;
                $alreadyfav->update(['fav' => $toggelAlreadyFav]);
            } else {
                $toggelAlreadyFav = 1;
                $alreadyfav->update(['fav' => $toggelAlreadyFav]);
            }
        } else {
            $alreadyfav = AttendeeFavSession::create([
                'attendee_id' => $attendee->id,
                'event_app_id' => $attendee->event_app_id,
                'event_session_id' => $sessionid,
                'fav' => 1,
            ]);
            $this->eventBadgeDetail('session_favorite', $attendee->event_app_id, $attendee->id, $alreadyfav->id);
        }

        return back()->withSuccess("Session added to favourite");
    }
}
