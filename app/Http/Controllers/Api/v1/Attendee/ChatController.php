<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use App\Models\EventApp;
use App\Events\EventGroupChat;
use App\Events\AttendeeChatMessage;
use App\Events\GroupChat;
use App\Models\AttendeePurchasedTickets;
use App\Models\ChatGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index(EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $user = Auth::user();
        $eventId = $event->id;
        // Private chats
        $members = ChatMember::where('event_id', $eventId)->whereNull('group_id')
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
        // Group chat
        $rooms = ChatGroup::where('event_id', $eventId)
            ->where('type', 'attendee')
            ->whereHas('members', function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->get()
            ->map(function ($room) {
                $lastMessage = ChatMessage::where('event_id', $room->event_id)
                    ->where('receiver_id', $room->id)
                    ->orderByDesc('created_at')
                    ->first();

                $room->last_message = $lastMessage?->message ?? null;
                $room->last_message_created_at = $lastMessage?->created_at ?? null;

                return $room;
            });

        $openrooms = ChatGroup::where('event_id', Auth::user()->event_app_id)
            ->where('type', 'attendee')
            ->where('visibility', 'public') // only public rooms
            ->whereDoesntHave('members', function ($q) {
                $q->where('user_id', Auth::id()); // exclude if user is already a member
            })
            ->get();
        $purchasedTicket = AttendeePurchasedTickets::where('attendee_id', $user->id)->exists();
        return response()->json([
            'status' => true,
            'members' => $members,
            'event_data' => $eventData,
            'logged_user' => $user->id,
            'rooms' => $rooms,
            'openrooms' => $openrooms,
            'purchasedTicket' => $purchasedTicket,
        ], 200);
    }

    public function getMessages(EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
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
            'status' => true,
            'messages' => $messages,
        ], 200);
    }

    public function getOneToOneChat($participant_id, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
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
            'status' => true,
            'messages' => $messages,
        ], 200);
    }

    // for fetching group chat
    public function getGroupChat($id, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $userId = Auth::id();
        $eventId = $event->id;

        // Reset unread count for this conversation
        // ChatMember::where('event_id', $eventId)->where('user_id', $userId)
        //     ->where('group_id', $id)
        //     ->update(['unread_count' => 0]);

        // Fetch messages
        $messages = ChatMessage::where('event_id', $eventId)
            ->where('group_id', $id)
            ->Where('receiver_id', $id)
            ->with(['sender', 'reply', 'files'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request, EventApp $event)
    {
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required',
            'reply_to' => 'nullable|exists:chat_messages,id',
            'files' => 'nullable|array',
            'room_type' => 'required',
        ]);

        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId = $event->id;
        $senderId = Auth::id();
        // Determine receiver type
        $receiverId = $request->receiver_id;
        $receiver_type = null;
        if ($request->room_type == 'Event_chat') {
            $receiver_type = \App\Models\EventApp::class;
        } elseif ($request->room_type == 'Group_chat') {
            $receiver_type = \App\Models\Attendee::class;
        } elseif ($request->room_type == 'Private_chat') {
            $receiver_type = \App\Models\Attendee::class;
        }

        // Ensure chat initiation
        if ($request->room_type == 'Private_chat') {
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
            'group_id' => $request->room_type == 'Group_chat' ? $receiverId : null,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\Attendee::class,
            'receiver_id' => $receiverId,
            'receiver_type' => $receiver_type,
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
        if ($request->room_type == 'Event_chat') {
            broadcast(new EventGroupChat($message))->toOthers();
        } elseif ($request->room_type == 'Private_chat') {
            broadcast(new AttendeeChatMessage($message))->toOthers();
        } elseif ($request->room_type == 'Group_chat') {
            broadcast(new GroupChat($message))->toOthers();
        }

        return response()->json(['status' => true, 'message' => $message], 200);
    }

    public function markAsRead($chatWithUserId, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId = $event->id;
        $userId = Auth::id();

        ChatMember::where('event_id', $eventId)
            ->where('participant_id', $userId)
            ->where('user_id', $chatWithUserId)
            ->update(['unread_count' => 0]);

        return response()->json(['status' => true], 200);
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

    public function join($id)
    {
        $group = ChatGroup::findOrFail($id);
        $userId = Auth::id();
        $eventId = Auth::user()->event_app_id;

        // Prevent duplicate join
        $alreadyMember = ChatMember::where('event_id', $eventId)
            ->where('group_id', $group->id)
            ->where('user_id', $userId)
            ->exists();

        if ($alreadyMember) {
            return response()->json([
                'status'  => true,
                'message' => 'Already a member of this group.',
            ]);
        }

        $member = ChatMember::create([
            'event_id'        => $eventId,
            'group_id'        => $group->id,
            'user_id'         => $userId,
            'user_type'       => \App\Models\Attendee::class,
            'participant_id'  => $group->created_by,
            'participant_type' => \App\Models\User::class,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Joined group successfully.',
        ]);
    }
}
