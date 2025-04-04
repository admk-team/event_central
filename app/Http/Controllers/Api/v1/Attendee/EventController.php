<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Models\EventApp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\EventResource;
use App\Http\Resources\Api\EventSessionResource;
use App\Http\Resources\Api\EventSpeakerResource;
use App\Models\EventSession;
use App\Models\EventSpeaker;

class EventController extends Controller
{
    public function getEventDetailDashboard(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform']);
        // dd($eventApp->toArray());
        return $this->successResponse(new EventResource($eventApp));
    }

    public function getEventDetailAgenda(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.event_platform']);
        return $this->successResponse(new EventResource($eventApp));
    }

    public function ticket(EventApp $eventApp)
    {
        $eventApp->load(['tickets']);
        return $this->successResponse(new EventResource($eventApp));
    }

    public function speaker(string $id)
    {
        $speakers = EventSpeaker::where('event_app_id', $id)->with('eventSessions')->get();
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
            $eventSession->load(['eventSpeaker', 'eventPlatform']);
            return $this->successResponse(new EventSessionResource($eventSession));
        } else {
            $eventApp->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform']);
            return $this->successResponse(new EventResource($eventApp));
        }
    }
}
