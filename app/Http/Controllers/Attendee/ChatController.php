<?php

namespace App\Http\Controllers\Attendee;

use App\Events\AttendeeChatMessage;
use App\Events\EventGroupChat;
use App\Events\GroupChat;
use App\Http\Controllers\Controller;
use App\Models\ChatGroup;
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
        // Private chats
        $member = ChatMember::where('event_id', Auth::user()->event_app_id)->whereNull('group_id')
            ->where('user_id', Auth::user()->id)
            ->with(['participant'])->get()
            ->map(function ($member) {
                $lastMessage = ChatMessage::where('event_id', $member->event_id)
                    ->where(function ($q) use ($member) {
                        $q->where(function ($q2) use ($member) {
                            $q2->where('sender_id', $member->user_id)
                                ->where('receiver_id', $member->participant_id);
                        })
                            ->orWhere(function ($q2) use ($member) {
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
        $event_data = EventApp::where('id', Auth::user()->event_app_id)->first();
        if ($event_data) {
            $lastMessage = ChatMessage::where('event_id', $event_data->id)
                ->where('receiver_id', $event_data->id)
                ->where('receiver_type', EventApp::class)
                ->orderByDesc('created_at')
                ->first();

            $event_data->last_message = $lastMessage?->message ?? null;
            $event_data->last_message_created_at = $lastMessage?->created_at;
        }
        // Group chat
        $rooms = ChatGroup::where('event_id', Auth::user()->event_app_id)
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
            ->whereHas('members', function ($q) {
                $q->where('user_id', '!=', Auth::id());
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

        $loged_user = Auth::user()->id;
        return Inertia::render('Attendee/Chat/Index', compact('member', 'event_data', 'loged_user', 'rooms', 'openrooms'));
    }

    public function getMessages($id)
    {
        $eventId = Auth::user()->event_app_id;
        $messages = ChatMessage::where('event_id', $eventId)
            ->Where('receiver_id', $id)
            ->with(['sender', 'reply', 'files'])
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
        // ChatMember::where('event_id', $eventId)->where('user_id', $userId)
        //     ->where('participant_id', $id)
        //     ->update(['unread_count' => 0]);

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
            ->with(['sender', 'reply', 'files'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    // for fetching group chat
    public function getGroupChat($id)
    {
        $userId = Auth::user()->id;
        $eventId = Auth::user()->event_app_id;

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


    public function store(Request $request)
    {

        // Validate the request
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required',
            'reply_to' => 'nullable|exists:chat_messages,id',
            'files' => 'nullable|array',
            'room_type' => 'required',
        ]);

        $eventId = Auth::user()->event_app_id;
        $senderId = Auth::user()->id;

        // Determine receiver type
        $receiver_id = $request->receiver_id;
        $receiver_type = null;
        if ($request->room_type == 'Event_chat') {
            $receiver_type = \App\Models\EventApp::class;
        } elseif ($request->room_type == 'Group_chat') {
            $receiver_type = \App\Models\Attendee::class;
        } elseif ($request->room_type == 'Private_chat') {
            $receiver_type = \App\Models\Attendee::class;
        }
        // check that both user initiate the chat
        if ($request->room_type == 'Private_chat') {
            $auth_user = ChatMember::where('event_id', $eventId)->where('user_id', $senderId)->where('participant_id', $receiver_id)->first();
            $participant_user = ChatMember::where('event_id', $eventId)->where('user_id', $receiver_id)->where('participant_id', $senderId)->first();
            if (!$auth_user) {
                $this->initiateChat($eventId, $senderId, \App\Models\Attendee::class, $receiver_id, \App\Models\User::class);
            }
            if (!$participant_user) {
                $this->initiateChat($eventId, $receiver_id, \App\Models\User::class, $senderId, \App\Models\Attendee::class);
            }
        }

        $message = ChatMessage::create([
            'event_id' => $eventId,
            'group_id' => $request->room_type == 'Group_chat' ? $receiver_id : null,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\Attendee::class,
            'receiver_id' => $receiver_id,
            'receiver_type' => $receiver_type,
            'message' => $request->message ?? null,
            'reply_to' => $request->reply_to,
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $originalName = $file->getClientOriginalName();
                $path = $file->store('chat_files', 'public');

                $message->files()->create([
                    'file_path' => "/storage/" . $path,
                    'file_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                    'file_name' => $originalName
                ]);
            }
        }

        $message->load(['sender', 'reply', 'files']);

        // Handle group or private chat
        if ($request->room_type == 'Event_chat') {
            // Group chat: increment unread for all other members in the event
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', '!=', $senderId)
            //     ->where('participant_type', \App\Models\EventApp::class)
            //     ->increment('unread_count');

            broadcast(new EventGroupChat($message))->toOthers();
        } elseif ($request->room_type == 'Private_chat') {
            // Private chat: increment unread only for the receiver
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', $receiver_id)
            //     ->where('participant_id', $senderId)
            //     ->increment('unread_count');

            broadcast(new AttendeeChatMessage($message))->toOthers();
        } elseif ($request->room_type == 'Group_chat') {
            // Group chat: increment unread only for the receiver
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', '!=', $senderId)
            //     ->where('group_id', $message->group_id)
            //     ->increment('unread_count');
            broadcast(new GroupChat($message))->toOthers();
        }

        return response()->json(['success' => true, 'message' => $message]);
    }

    public function markAsRead($chatWithUserId)
    {
        $eventId = Auth::user()->event_app_id;
        $userId = Auth::user()->id;

        ChatMember::where('event_id', $eventId)
            ->where('participant_id', $userId)
            ->where('user_id', $chatWithUserId)
            ->update(['unread_count' => 0]);

        return response()->json(['success' => true]);
    }

    public function initiateChat($event, $user_id, $user_type, $participant_id, $participant_type)
    {
        ChatMember::create([
            'event_id' => $event,
            'user_id' => $user_id,
            'user_type' => $user_type,
            'participant_id' => $participant_id,
            'participant_type' => $participant_type,
        ]);
    }

    public function join($id)
    {
        $group = ChatGroup::findOrFail($id);
        $userId = Auth::id();

        // Prevent duplicate join
        $alreadyMember = $group->members()->where('user_id', $userId)->exists();
        if ($alreadyMember) {
           return back()->withSuccess('Added successfully.');
        }

        // Add the user as a member
        $group->members()->create([
            'user_id' => $userId,
            'event_id' => $group->event_id,
        ]);

        // Return updated group with members
      return back()->withSuccess('Added successfully.');
    }
}
