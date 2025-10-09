<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use App\Models\EventApp;
use App\Events\EventGroupChat;
use App\Events\AttendeeChatMessage;
use App\Events\GroupChat;
use App\Models\Attendee;
use App\Models\ChatGroup;
use App\Models\User;
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
        $members = ChatMember::where('event_id', $eventId)->where('user_id', $user->id)->whereNull('group_id')
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

                $member->last_message = $lastMessage?->message ?? null;
                $member->last_message_created_at = $lastMessage?->created_at ?? null;
                return $member;
            });
        // Group chat details
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

        // for rooms private
        $rooms = ChatGroup::where('event_id', $eventId)
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

        // staff and attendees for creating rooms
        $staff = null;
        if (Auth::user()->parent_id) {
            $staff = User::where('parent_id', Auth::user()->parent_id)->get()->toArray();
        } else {
            $staff = User::where('parent_id', $user->id)->get()->toArray();
        }
        $attendees = Attendee::where('event_app_id', $eventId)->get();

        $openrooms = ChatGroup::where('event_id', $eventId)
            ->where('type', 'staff')
            ->where('visibility', 'public')
            ->whereDoesntHave('members', function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->get();

        return response()->json([
            'status' => true,
            'members' => $members,
            'event_data' => $eventData,
            'logged_user' => $user->id,
            'staff' => $staff,
            'attendees' => $attendees,
            'rooms' => $rooms,
            'openrooms' => $openrooms,
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

        // Reset unread count
        ChatMember::where('event_id', $eventId)
            ->where('user_id', $userId)
            ->where('participant_id', $participant_id)
            ->update(['unread_count' => 0]);

        // Fetch messages
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

        $userId = Auth::user()->id;
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
        $receiverId = $request->receiver_id;
        $receiver_type = null;
        if ($request->room_type == 'Event_chat') {
            $receiver_type = \App\Models\EventApp::class;
        } elseif ($request->room_type == 'Group_chat') {
            $receiver_type = \App\Models\User::class;
        } elseif ($request->room_type == 'Private_chat') {
            $receiver_type = \App\Models\Attendee::class;
        }

        // Ensure chat is initiated
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
                $this->initiateChat($eventId, $senderId, \App\Models\User::class, $receiverId, \App\Models\Attendee::class);
            }
            if (!$participantUser) {
                $this->initiateChat($eventId, $receiverId, \App\Models\Attendee::class, $senderId, \App\Models\User::class);
            }
        }

        // Create message
        $message = ChatMessage::create([
            'event_id' => $eventId,
            'group_id' => $request->room_type == 'Group_chat' ? $receiverId : null,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\User::class,
            'receiver_id' => $receiverId,
            'receiver_type' => $receiver_type,
            'message' => $request->message ?? null,
            'reply_to' => $request->reply_to,
        ]);

        // Attach files if any
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

        // Broadcast events
        if ($request->room_type == 'Event_chat') {
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', '!=', $senderId)
            //     ->where('participant_type', \App\Models\EventApp::class)
            //     ->increment('unread_count');

            broadcast(new EventGroupChat($message))->toOthers();
        } elseif ($request->room_type == 'Private_chat') {
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', $receiverId)
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

    public function initiateChat($event, $user_id, $user_type, $participant_id, $participant_type, $group_id = null)
    {
        ChatMember::create([
            'event_id' => $event,
            'group_id' => $group_id,
            'user_id' => $user_id,
            'user_type' => $user_type,
            'participant_id' => $participant_id,
            'participant_type' => $participant_type,
        ]);
    }

    public function createRoom(Request $request, EventApp $event)
    {
        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not fount'
            ], 404);
        }

        $eventId = $event->id;
        $userId = Auth::user()->id;

        $rules = [
            "type" => "required",
            "name" => "required",
            "image" => "nullable|image|mimes:jpg,jpeg,png,gif|max:2048",
            "visibility" => "required|in:public,private",
        ];

        if ($request->visibility == "private") {
            $rules["members"] = "required|array|min:1";
        }
        $messages = [
            "members.required" => "Please select at least one member.",
            "members.array"    => "Invalid members format.",
            "members.min"      => "Please select at least one member.",
        ];
        $request->validate($rules, $messages);

        $path = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('chat_groups', 'public');
        }

        $group = ChatGroup::create([
            'event_id' => $eventId,
            'name' => $request->name,
            'image' =>  $path,
            'type' => strtolower($request->type),
            'created_by' => $userId,
            'visibility' => $request->visibility,
        ]);
        $this->initiateChat($eventId,  $userId, \App\Models\User::class, $userId, \App\Models\User::class, $group->id);
        if (is_array($request->members) && count($request->members) > 0 && $request->visibility == "private") {
            $member_type = $request->type == 'Staff' ? \App\Models\User::class : \App\Models\Attendee::class;
            foreach ($request->members as $member) {
                $this->initiateChat($eventId,  $member, $member_type, $userId, \App\Models\User::class, $group->id);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Room Created Successfully'
        ], 200);
    }

    public function join($id, EventApp $event)
    {
        $group = ChatGroup::findOrFail($id);
        $userId = Auth::user()->id;

        // Prevent duplicate join
        $alreadyMember = ChatMember::where('event_id', $event->id)->where('group_id', $group->id)->where('user_id', $userId)->exists();
        if ($alreadyMember) {
            return back()->withSuccess('Added successfully.');
        }

        ChatMember::create([
            'event_id' => $event->id,
            'group_id' => $group->id,
            'user_id' => $userId,
            'user_type' => \App\Models\User::class,
            'participant_id' => $group->created_by,
            'participant_type' => \App\Models\User::class,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Added successfully.'
        ], 200);
    }
    public function destroy($id, EventApp $event)
    {
        $group = ChatGroup::find($id);
        $userId = Auth::user()->id;

        if ($group->created_by != $userId) {
            return response()->json([
                'status' => false,
                'message' => 'You are not authorized to delete this group.'
            ], 403);
        }

        // // Delete associated chat members and messages
        // ChatMember::where('event_id', $event->id)->where('group_id', $group->id)->delete();
        // ChatMessage::where('event_id', $event->id)->where('group_id', $group->id)->delete();

        // Delete the group
        $group->delete();

        return response()->json([
            'status' => true,
            'message' => 'Group deleted successfully.'
        ], 200);
    }
}
