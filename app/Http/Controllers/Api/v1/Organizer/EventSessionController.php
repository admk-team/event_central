<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\EventSessionResource;
use App\Models\EventApp;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventSessionController extends Controller
{
    public function index(Request $request, EventApp $event)
    {
        if (! Auth::user()->can('view_events', $event)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $sessions = EventSession::where('event_app_id', $event->id)
            ->whereCanBeAccessedBy($request->user())
            ->with(['eventPlatform', 'eventDate'])
            ->get();
        
        return $this->successResponse(EventSessionResource::collection($sessions));
    }

    public function show(EventApp $event, EventSession $session)
    {
        if (!Auth::user()->can('view_events', $event) || !Auth::user()->can('view_event_sessions', $session)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $session->load(['eventPlatform', 'eventDate']);

        return $this->successResponse(new EventSessionResource($session));
    }
}
