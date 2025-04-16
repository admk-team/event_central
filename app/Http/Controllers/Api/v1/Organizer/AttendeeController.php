<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AttendeeResource;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendeeController extends Controller
{
    public function index(EventApp $event)
    {
        if (! Auth::user()->can('view_attendees')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $attendees = $event->attendees;

        return $this->successResponse(AttendeeResource::collection($attendees));
    }

    public function show(EventApp $event, Attendee $attendee)
    {
        if (! Auth::user()->can('view_attendees')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        return $this->successResponse(new AttendeeResource($attendee));
    }
}
