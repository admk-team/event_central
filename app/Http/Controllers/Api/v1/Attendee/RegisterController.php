<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    public function register(Request $request, $eventId)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required','string','lowercase','email','max:255',
                Rule::unique('attendees', 'email')->where('event_app_id', $eventId),
            ],
            'position' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $event = EventApp::findOrFail($eventId);
        $url = route('organizer.events.website', $event->uuid);
        $code = substr(sha1(mt_rand()), 1, 32);
        $personal_url = $url . '?link=' . $code;
        $attendee = new Attendee();
        $attendee->first_name = $request->first_name;
        $attendee->last_name = $request->last_name;
        $attendee->location = $request->location;
        $attendee->position = $request->position;
        $attendee->email = $request->email;
        $attendee->password = Hash::make($request->password);
        $attendee->event_app_id  = $event->id;
        $attendee->type = "anonymous";
        $attendee->personal_url =  $personal_url ?? null;
        $attendee->save();

        $token = $attendee->createToken('auth_token', ["role:attendee"])->plainTextToken;
        $this->eventBadgeDetail('register', $event->id, $attendee->id, null);
        return response()->json([
            'user' => $attendee,
            'role' => "attendee",
            'token' => $token,
        ]);

        return response()->json(['message' => 'Attendee registered successfully'], 201);
    }
}
