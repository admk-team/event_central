<?php

namespace App\Http\Controllers\Attendee;

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
        $member = ChatMember::where('event_id', Auth::user()->event_app_id)->with('participant')->first();
        $event_data = EventApp::where('id', Auth::user()->event_app_id)->first();
        $lastMessage = ChatMessage::where('event_id', Auth::user()->event_app_id)->with('sender')->latest('created_at')->first();
        $loged_user = Auth::user()->id;
        $unread_count = $member->unread_count ?? 0;

        return Inertia::render('Attendee/Chat/Index', compact('member', 'event_data', 'loged_user','unread_count','lastMessage'));
    }

    public function getMessages()
    {
        $messages = ChatMessage::where('event_id', Auth::user()->event_app_id)->with('sender')->get();
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

        $eventId = Auth::user()->event_app_id;
        $senderId = Auth::user()->id;

        $message = ChatMessage::create([
            'event_id' => $eventId,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\Attendee::class,
            'message'=> $request->message,
        ]);
        $message->load('sender');

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
