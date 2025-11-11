<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\ChatMember;
use App\Models\EventApp;
use App\Models\EventAppSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventStaffController extends Controller
{
    public function index()
    {
        $event_app = EventApp::find(Auth::user()->event_app_id);
        if (!$event_app) {
            return back()->with('error', 'No event found.');
        }

        $authUserId = Auth::user()->id;

        // Get all participant_ids where current user has initiated a chat in this event
        $chatInitiatedWith = ChatMember::where('event_id', $event_app->id)->where('user_id', $authUserId)->pluck('participant_id')->toArray();
        $staff = $event_app->authorizedUsers->map(function ($user) use ($chatInitiatedWith) {
            if ($user->chat_with_organizer) {
                $user->is_chat = in_array($user->id, $chatInitiatedWith);
                return $user;
            }
        })->filter();

        $enable_organizer_chat = EventAppSetting::where('event_app_id', $event_app->id)
            ->where('key', 'organizer_chat')
            ->first();

        $enable_organizer_chat = !empty($enable_organizer_chat->value) && $enable_organizer_chat->value == 1;

        return Inertia::render('Attendee/EventStaff/Index', compact('staff', 'enable_organizer_chat'));
    }


    public function initiateChat(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required'
        ]);
        $event = EventApp::find(Auth::user()->event_app_id);
        $user = User::find($request->receiver_id);

        if (!$event) {
            return back()->withError('No active event found.');
        }
        if (!$user) {
            return back()->withError('No user found.');
        }

        $existing = ChatMember::where('event_id', $event->id)
            ->where('user_id', Auth::user()->id)
            ->where('participant_id', $user->id)
            ->first();

        if ($existing) {
            return back()->withError('A chat with this user already exists.');
        }

        ChatMember::create([
            'event_id' => $event->id,
            'user_id' => Auth::user()->id,
            'user_type' => \App\Models\Attendee::class,
            'participant_id' => $user->id,
            'participant_type' => \App\Models\User::class,
        ]);

        return redirect()->route('attendee.event.chat')->withSuccess('Chat initiated successfully.');
    }
}
