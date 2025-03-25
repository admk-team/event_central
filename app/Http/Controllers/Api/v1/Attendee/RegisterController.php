<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request, $eventId)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:attendees',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $event = EventApp::findOrFail($eventId);
        $attendee = new Attendee();
        $attendee->first_name = $request->first_name;
        $attendee->last_name = $request->last_name;
        $attendee->email = $request->email;
        $attendee->password = Hash::make($request->password);
        $attendee->event_app_id  = $event->id;
        $attendee->type = "anonymous";
        $attendee->save();

        $token = $attendee->createToken('auth_token', ["role:attendee"])->plainTextToken;

        return response()->json([
            'user' => $attendee,
            'role' => "attendee",
            'token' => $token,
        ]);

        return response()->json(['message' => 'Attendee registered successfully'], 201);
    }
}
