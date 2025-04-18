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
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Api\EventResource;
use App\Http\Resources\Api\EventSessionResource;
use App\Http\Resources\Api\EventSpeakerResource;

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
            'event_sessions.eventSpeakers',
            'event_sessions.eventPlatform'
        ]);
        return response()->json([
            'eventapp' => new EventResource($eventApp),
            'eventdates' => $eventdates,
            'tracks' => $tracks,
            'enableTracks' => $enableTracks,
            'eventPlatforms' => $eventPlatforms
        ], 200);
    }

    public function ticket(EventApp $eventApp)
    {

        $eventApp->load(['public_tickets.sessions', 'public_tickets.addons', 'public_tickets.fees']);
        return $this->successResponse(new EventResource($eventApp));
    }

    public function speaker(string $id)
    {
        $speakers = EventSpeaker::where('event_app_id', $id)->with('eventSessions')->orderBy('name', 'ASC')->get();
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
}
