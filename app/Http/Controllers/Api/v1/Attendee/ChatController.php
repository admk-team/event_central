<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use App\Models\EventApp;
use App\Events\EventGroupChat;
use App\Events\AttendeeChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index(EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $user = Auth::user();
        $eventId = $event->id;
        // Private chats
        $members = ChatMember::where('event_id', $eventId)
            ->where('user_id', $user->id)
            ->with(['participant'])
            ->get()
            ->map(function ($member) {
                $lastMessage = ChatMessage::where('event_id', $member->event_id)
                    ->where(function ($q) use ($member) {
                        $q->where(function ($q2) use ($member) {
                            $q2->where('sender_id', $member->user_id)
                                ->where('receiver_id', $member->participant_id);
                        })->orWhere(function ($q2) use ($member) {
                            $q2->where('sender_id', $member->participant_id)
                                ->where('receiver_id', $member->user_id);
                        });
                    })
                    ->orderByDesc('created_at')
                    ->first();

                $member->last_message = $lastMessage->message ?? null;
                $member->last_message_created_at = $lastMessage?->created_at ?? null;
                return $member;
            });

        // Public chat
        $eventData = EventApp::find($eventId);
        if ($eventData) {
            $lastMessage = ChatMessage::where('event_id', $eventData->id)
                ->where('receiver_id', $eventData->id)
                ->where('receiver_type', EventApp::class)
                ->orderByDesc('created_at')
                ->first();

            $eventData->last_message = $lastMessage?->message ?? null;
            $eventData->last_message_created_at = $lastMessage?->created_at;
        }

        return response()->json([
            'success' => true,
            'members' => $members,
            'event_data' => $eventData,
            'logged_user' => $user->id
        ], 200);
    }

    public function getMessages(EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId =  $event->id;

        $messages = ChatMessage::where('event_id', $eventId)
            ->where('receiver_id', $eventId)
            ->with(['sender', 'reply', 'files'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ], 200);
    }

    public function getOneToOneChat($participant_id, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $userId = Auth::id();
        $eventId = $event->id;

        ChatMember::where('event_id', $eventId)
            ->where('user_id', $userId)
            ->where('participant_id', $participant_id)
            ->update(['unread_count' => 0]);

        $messages = ChatMessage::where('event_id', $eventId)
            ->where(function ($query) use ($userId, $participant_id) {
                $query->where(function ($q) use ($userId, $participant_id) {
                    $q->where('sender_id', $userId)->where('receiver_id', $participant_id);
                })->orWhere(function ($q) use ($userId, $participant_id) {
                    $q->where('sender_id', $participant_id)->where('receiver_id', $userId);
                });
            })
            ->with(['sender', 'reply', 'files'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ], 200);
    }

    public function store(Request $request, EventApp $event)
    {
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required',
            'reply_to' => 'nullable|exists:chat_messages,id',
            'files' => 'nullable|array',
        ]);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId = $event->id;
        $senderId = Auth::id();
        $receiverId = $request->receiver_id;
        $receiverType = ($receiverId == $eventId) ? \App\Models\EventApp::class : \App\Models\Attendee::class;

        // Ensure chat initiation
        if ($receiverType !== \App\Models\EventApp::class) {
            $authUser = ChatMember::where('event_id', $eventId)
                ->where('user_id', $senderId)
                ->where('participant_id', $receiverId)
                ->first();

            $participantUser = ChatMember::where('event_id', $eventId)
                ->where('user_id', $receiverId)
                ->where('participant_id', $senderId)
                ->first();

            if (!$authUser) {
                $this->initiateChat($eventId, $senderId, \App\Models\Attendee::class, $receiverId, \App\Models\User::class);
            }
            if (!$participantUser) {
                $this->initiateChat($eventId, $receiverId, \App\Models\User::class, $senderId, \App\Models\Attendee::class);
            }
        }

        // Save message
        $message = ChatMessage::create([
            'event_id' => $eventId,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\Attendee::class,
            'receiver_id' => $receiverId,
            'receiver_type' => $receiverType,
            'message' => $request->message,
            'reply_to' => $request->reply_to,
        ]);

        // Handle files if any
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('chat_files', 'public');
                $message->files()->create([
                    'file_path' => "/storage/" . $path,
                    'file_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                    'file_name' => $file->getClientOriginalName()
                ]);
            }
        }

        $message->load(['sender', 'reply', 'files']);

        // Broadcast event
        if ($receiverType === \App\Models\EventApp::class) {
            ChatMember::where('event_id', $eventId)
                ->where('user_id', '!=', $senderId)
                ->where('participant_type', \App\Models\EventApp::class)
                ->increment('unread_count');

            broadcast(new EventGroupChat($message))->toOthers();
        } else {
            ChatMember::where('event_id', $eventId)
                ->where('user_id', $receiverId)
                ->where('participant_id', $senderId)
                ->increment('unread_count');

            broadcast(new AttendeeChatMessage($message))->toOthers();
        }

        return response()->json(['success' => true, 'message' => $message], 200);
    }

    public function markAsRead($chatWithUserId, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId = $event->id;
        $userId = Auth::id();

        ChatMember::where('event_id', $eventId)
            ->where('participant_id', $userId)
            ->where('user_id', $chatWithUserId)
            ->update(['unread_count' => 0]);

        return response()->json(['success' => true], 200);
    }

    private function initiateChat($event, $userId, $userType, $participantId, $participantType)
    {
        ChatMember::create([
            'event_id' => $event,
            'user_id' => $userId,
            'user_type' => $userType,
            'participant_id' => $participantId,
            'participant_type' => $participantType,
        ]);
    }
}
