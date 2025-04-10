<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\EventResource;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_events')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $events = EventApp::ofOwner()
            ->with('images')
            ->whereCanBeAccessedBy($request->user())
            ->get();

        return $this->successResponse(EventResource::collection($events));
    }

    public function show(EventApp $event)
    {
        if (! Auth::user()->can('view_events', $event)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $event->load(['images']);

        return $this->successResponse(new EventResource($event));
    }
}
