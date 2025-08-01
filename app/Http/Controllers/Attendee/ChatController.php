<?php

namespace App\Http\Controllers\Attendee;

use App\Events\AttendeeChatMessage;
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
        $member = ChatMember::where('event_id', Auth::user()->event_app_id)->where('user_id', Auth::user()->id)->with('participant')->get();
        $event_data = EventApp::where('id', Auth::user()->event_app_id)->first();
        $lastMessage = ChatMessage::where('event_id', Auth::user()->event_app_id)->with('sender')->latest('created_at')->first();
        $loged_user = Auth::user()->id;
        return Inertia::render('Attendee/Chat/Index', compact('member', 'event_data', 'loged_user', 'lastMessage'));
    }

    public function getMessages($id)
    {
        $eventId = Auth::user()->event_app_id;
        $messages = ChatMessage::where('event_id', $eventId)
            ->Where('receiver_id', $id)
            ->with(['sender', 'reply'])
            ->orderBy('created_at', 'asc')
            ->get();
        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    public function getOneToOneChat($id)
    {
        $userId = Auth::user()->id;
        $eventId = Auth::user()->event_app_id;

        // Reset unread count for this conversation
        ChatMember::where('event_id', $eventId)->where('user_id', $userId)
            ->where('participant_id', $id)
            ->update(['unread_count' => 0]);

        // Fetch messages
        $messages = ChatMessage::where('event_id', $eventId)
            ->where(function ($query) use ($userId, $id) {
                $query->where(function ($q) use ($userId, $id) {
                    $q->where('sender_id', $userId)
                        ->where('receiver_id', $id);
                })
                    ->orWhere(function ($q) use ($userId, $id) {
                        $q->where('sender_id', $id)
                            ->where('receiver_id', $userId);
                    });
            })
            ->with(['sender', 'reply'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {

        // Validate the request
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required',
            'reply_to' => 'nullable|exists:chat_messages,id',
        ]);

        $eventId = Auth::user()->event_app_id;
        $senderId = Auth::user()->id;

        // Determine receiver type
        $receiver_id = $request->receiver_id;
        $receiver_type = ($receiver_id == $eventId) ? \App\Models\EventApp::class : \App\Models\Attendee::class;

        $message = ChatMessage::create([
            'event_id' => $eventId,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\Attendee::class,
            'receiver_id' => $receiver_id,
            'receiver_type' => $receiver_type,
            'message' => $request->message,
            'reply_to' => $request->reply_to,
        ]);

        $message->load(['sender', 'reply']);

        // Handle group or private chat
        if ($receiver_type === \App\Models\EventApp::class) {
            // Group chat: increment unread for all other members in the event
            ChatMember::where('event_id', $eventId)
                ->where(function ($q) use ($senderId) {
                    $q->where('participant_id', '!=', $senderId)
                        ->orWhere('user_id', '!=', $senderId);
                })
                ->increment('unread_count');
            broadcast(new EventGroupChat($message))->toOthers();
        } else {
            // Private chat: increment unread only for the receiver
            ChatMember::where('event_id', $eventId)
                ->where(function ($q) use ($receiver_id) {
                    $q->where('participant_id', $receiver_id)
                        ->orWhere('user_id', $receiver_id);
                })
                ->increment('unread_count');
            broadcast(new AttendeeChatMessage($message))->toOthers();
        }

        return response()->json(['success' => true, 'message' => $message]);
    }
}
