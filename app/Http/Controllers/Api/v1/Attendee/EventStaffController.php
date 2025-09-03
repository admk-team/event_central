<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\ChatMember;
use App\Models\EventApp;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EventStaffController extends Controller
{
    public function index()
    {
        $event_app = EventApp::find(Auth::user()->event_app_id);
        if (!$event_app) {
            return response()->json(['status' => 'error', 'message' => 'No event found.'], 400);
        }

        $authUserId = Auth::user()->id;

        // Get all participant_ids where current user has initiated a chat in this event
        $chatInitiatedWith = ChatMember::where('event_id', $event_app->id)->where('user_id', $authUserId)->pluck('participant_id')->toArray();

        $staff = $event_app->authorizedUsers->map(function ($user) use ($chatInitiatedWith) {
            $user->is_chat = in_array($user->id, $chatInitiatedWith);
            return $user;
        });
        return response()->json(['status' => true, 'data' => $staff], 200);
    }


    public function initiateChat(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required'
        ]);
        $event = EventApp::find(Auth::user()->event_app_id);
        $user = User::find($request->receiver_id);

        if (!$event) {
            return response()->json(['status' => 'error', 'message' => 'No active event found.'], 400);
        }
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'No user found.'], 400);
        }

        $existing = ChatMember::where('event_id', $event->id)
            ->where('user_id', Auth::user()->id)
            ->where('participant_id', $user->id)
            ->first();

        if ($existing) {
            return response()->json(['status' => 'error', 'message' => 'A chat with this user already exists.'], 400);
        }

        ChatMember::create([
            'event_id' => $event->id,
            'user_id' => Auth::user()->id,
            'user_type' => \App\Models\Attendee::class,
            'participant_id' => $user->id,
            'participant_type' => \App\Models\User::class,
        ]);

        return response()->json(['status' => true, 'message' => 'Chat initiated successfully.'], 200);
    }
}
