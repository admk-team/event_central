<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Events\EventGroupChat;
use App\Http\Controllers\Controller;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $member = ChatMember::currentEvent()->with('participant')->first();
        $event_data = EventApp::where('id', session('event_id'))->first();
        $loged_user = Auth::user()->id;
        $unread_count = $member->unread_count ?? 0;

        return Inertia::render('Organizer/Events/Chat/Index', compact('member', 'event_data', 'loged_user','unread_count'));
    }

    public function getMessages()
    {
        $messages = ChatMessage::currentEvent()->with('sender')->get();
        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);
        $eventId = session('event_id');
        $senderId = Auth::user()->id;
        $message = ChatMessage::create([
            'event_id' => $eventId,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\User::class,
            'message' => $request->message,
        ]);
        $message->load('sender');
        // Increment unread_count for all other participants
        ChatMember::where('event_id', $eventId)
            ->where(function ($query) use ($senderId) {
                $query->where('participant_id', '!=', $senderId)
                    ->where('participant_type', \App\Models\User::class);
            })
            ->increment('unread_count');

        broadcast(new EventGroupChat($message))->toOthers();
        return response()->json(['success' => true, 'message' => $message]);
    }
}
