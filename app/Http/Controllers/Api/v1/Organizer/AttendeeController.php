<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AttendeeResource;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

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

    public function create(Request $request, EventApp $event)
    {
        if (! Auth::user()->can('create_attendees')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:attendees,email',
        ]);

        $attendee = Attendee::create([
            'event_app_id' => $event->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'company' => $request->company,
            'position' => $request->position,
            'phone' => $request->phone,
            'bio' => $request->bio,
            'location' => $request->location,
            'password' => Hash::make("12345678"),
        ]);

        return $this->successResponse(new AttendeeResource($attendee));
    }

    public function show(EventApp $event, Attendee $attendee)
    {
        if (! Auth::user()->can('view_attendees')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        return $this->successResponse(new AttendeeResource($attendee));
    }

    public function update(Request $request, EventApp $event, Attendee $attendee)
    {
        if (! Auth::user()->can('edit_attendees')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('attendees')->ignore($attendee->id),
                'email'
            ],
            'company' => 'nullable',
            'position' => 'nullable',
            'phone' => 'nullable',
            'bio' => 'nullable',
            'location' => 'nullable',
        ]);

        $attendee->update($request->input());

        return $this->successResponse(new AttendeeResource($attendee));
    }
}
