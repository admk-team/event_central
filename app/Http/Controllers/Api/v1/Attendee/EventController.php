<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Models\Track;
use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use App\Models\EventPlatform;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AttendeeFavSessionResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Api\EventResource;
use App\Http\Resources\Api\EventSessionResource;
use App\Http\Resources\Api\EventSpeakerResource;
use App\Models\AttendeeFavSession;
use App\Models\EventPartner;
use App\Models\EventPartnerCategory;
use App\Models\SessionCheckIn;
use App\Models\SessionRating;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function getEventDetailDashboard(String $eventApp)
    {
        // dd(Auth::user());
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform']);
        return $this->successResponse(new EventResource($eventApp));
    }

    public function getEventDetailAgenda(EventApp $eventApp)
    {
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
        $partnerCategories = EventPartnerCategory::where('event_app_id', $eventApp->id)->with(['partners'])->get();
        $exhibitors = EventPartner::where('event_app_id', $eventApp->id)->where('type', 'exhibitor')->orderBy('company_name', 'asc')->get();
        return response()->json([
            'eventapp' => new EventResource($eventApp),
            'eventdates' => $eventdates,
            'tracks' => $tracks,
            'enableTracks' => $enableTracks,
            'eventPlatforms' => $eventPlatforms,
            'partnerCategories' => $partnerCategories,
            'exhibitors' => $exhibitors
        ], 200);
    }

    public function ticket(EventApp $eventApp)
    {

        $eventApp->load(['public_tickets.sessions', 'public_tickets.addons', 'public_tickets.fees']);
        return $this->successResponse(new EventResource($eventApp));
    }

    public function speaker(string $id)
    {
        $speakers = EventSpeaker::where('event_app_id', $id)->with(['eventSessions.eventPlatform', 'eventSessions.eventDate'])->orderBy('name', 'ASC')->get();
        return $this->successResponse(EventSpeakerResource::collection($speakers));
    }

    public function contact(EventApp $eventApp)
    {
        $eventApp->load(['organiser']);

        return $this->successResponse(new EventResource($eventApp));
    }

    public function eventsessions(EventApp $eventApp, EventSession $eventSession)
    {
        if ($eventSession->exists) {
            $eventSession->load(['eventSpeakers', 'eventPlatform']);
            return $this->successResponse(new EventSessionResource($eventSession));
        } else {
            $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform']);
            return $this->successResponse(new EventResource($eventApp));
        }
    }

    public function allevents()
    {
        $allevent = EventApp::select('id', 'name')->get();

        return response()->json(['events' => $allevent], 200);
    }

    public function getSessionRatings(Request $request, EventSession $eventSession)
    {
        // Load the event session with attendees and their ratings
        $eventSession->load(['attendeesRating']);

        // Filter attendees who have provided a rating (non-null rating)
        $ratedAttendees = $eventSession->attendeesRating
            ? $eventSession->attendeesRating
            ->filter(fn($attendee) => !is_null($attendee->pivot->rating))
            ->map(function ($attendee) {
                return [
                    'id' => $attendee->id,
                    'first_name' => $attendee->first_name,
                    'avatar' => $attendee->avatar ?? '/default-avatar.png',
                    'rating' => $attendee->pivot->rating,
                    'rating_description' => $attendee->pivot->rating_description ?? 'No description provided',
                ];
            })
            ->values()
            ->toArray()
            : [];

        // Calculate the average rating only for attendees with ratings
        $averageRating = count($ratedAttendees) > 0
            ? array_sum(array_column($ratedAttendees, 'rating')) / count($ratedAttendees)
            : 0;

        // Fetch the current attendee's rating (if any)
        $currentAttendeeRating = SessionRating::where('attendee_id', auth()->id())
            ->where('event_session_id', $eventSession->id)
            ->first(['rating', 'rating_description']);

        // Check rating conditions
        $checkin = SessionCheckIn::where('attendee_id', auth()->id())
            ->where('session_id', $eventSession->id)
            ->exists();

        $selectedSessionDetails = DB::table('attendee_event_session')
            ->where('attendee_id', auth()->id())
            ->where('event_session_id', $eventSession->id)
            ->first();

        $sessionSelected = !is_null($selectedSessionDetails);

        $now = now();
        $startTimeRaw = $eventSession->start_date_time;

        // Convert startTime to a Carbon instance if it's a string, or handle invalid cases
        try {
            $startTime = $startTimeRaw ? \Carbon\Carbon::parse($startTimeRaw) : null;
        } catch (\Exception $e) {
            $startTime = null;
        }

        // Handle the case where startTime is valid
        if ($startTime instanceof \Carbon\Carbon) {
            $endTime = (clone $startTime)->addMinutes(15); // 15 minutes after session end
            $ratingEnabled = $now->isBetween($startTime, $endTime);
            $startTimeFormatted = $startTime->format('M d, Y h:i A');
            $endTimeFormatted = $endTime->format('M d, Y h:i A');
        } else {
            // Fallback: Assume rating is disabled if start_date_time is invalid
            $ratingEnabled = false;
            $startTimeFormatted = 'N/A';
            $endTimeFormatted = 'N/A';
        }

        $canRate = $sessionSelected && $checkin && $ratingEnabled;

        $ratingConditions = [
            'canRate' => $canRate,
            'conditions' => [
                'sessionSelected' => [
                    'status' => $sessionSelected,
                    'message' => $sessionSelected ? null : "You can leave a rating only for sessions you've purchased."
                ],
                'checkin' => [
                    'status' => $checkin,
                    'message' => $checkin ? null : "Please check in to the session to leave a rating."
                ],
                'ratingEnabled' => [
                    'status' => $ratingEnabled,
                    'message' => $ratingEnabled ? null : "Rating can only be added between the session start and 15 minutes after the session ends (" . $startTimeFormatted . " to " . $endTimeFormatted . ")."
                ],
            ],
        ];

        return response()->json([
            'eventSession' => $eventSession,
            'averageRating' => round($averageRating, 1),
            'ratedAttendees' => $ratedAttendees,
            'currentAttendeeRating' => $currentAttendeeRating ? [
                'rating' => $currentAttendeeRating->rating,
                'rating_description' => $currentAttendeeRating->rating_description,
            ] : null,
            'ratingConditions' => $ratingConditions,
        ]);
    }

    public function saveRating(Request $request, EventSession $eventSession)
    {
        $request->validate([
            'rating' => 'required|numeric',
            'rating_description' => 'required|string|max:255',
        ]);
        $data = $request->only(['rating', 'rating_description']);
        SessionRating::updateOrCreate(
            [
                'attendee_id' => auth()->id(),
                'event_session_id' => $eventSession->id,
            ],
            $data
        );
        return response()->json(['message' => "Saved"]);
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
        }

        return $this->successResponse(new AttendeeFavSessionResource($alreadyfav));
    }

    public function allfav()
    {
        $attendee = auth()->user();
        $allfav = AttendeeFavSession::where('attendee_id', $attendee->id)->where('fav', 1)->with(['session'])->get();

        return $this->successResponse(AttendeeFavSessionResource::collection($allfav));
    }
}
