<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Events\AttendeeChatMessage;
use App\Events\EventGroupChat;
use App\Events\GroupChat;
use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\ChatGroup;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use App\Models\EventApp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $eventId = session('event_id');
        $member = ChatMember::currentEvent()->where('user_id', Auth::user()->id)->whereNull('group_id')
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

        $event_data = EventApp::where('id', session('event_id'))->first();
        $rooms = ChatGroup::where('event_id', session('event_id'))
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

        if ($event_data) {
            $lastMessage = ChatMessage::where('event_id', $event_data->id)
                ->where('receiver_id', $event_data->id)
                ->where('receiver_type', EventApp::class)
                ->orderByDesc('created_at')
                ->first();

            $event_data->last_message = $lastMessage?->message ?? null;
            $event_data->last_message_created_at = $lastMessage?->created_at;
        }
        $loged_user = Auth::user()->id;
        $staff = null;
        if (Auth::user()->parent_id) {
            $staff = User::where('parent_id', Auth::user()->parent_id)->get()->toArray();
        } else {
            $staff = User::where('parent_id', $loged_user)->get()->toArray();
        }
        $attendees = Attendee::where('event_app_id', $eventId)->get();

        $openrooms = ChatGroup::where('event_id', $eventId)
            ->where('type', 'staff')
            ->where('visibility', 'public') // only public rooms
            ->whereDoesntHave('members', function ($q) {
                $q->where('user_id', Auth::id()); // exclude if user is already a member
            })
            ->get();

        return Inertia::render('Organizer/Events/Chat/Index', compact('member', 'event_data', 'loged_user', 'staff', 'attendees', 'rooms', 'openrooms'));
    }

    public function getMessages($id)
    {
        $eventId = session('event_id');
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
        $eventId = session('event_id');

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
        $eventId = session('event_id');

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

    // for send message
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

        $eventId = session('event_id');
        $senderId = Auth::user()->id;

        // Determine receiver type
        $receiver_id = $request->receiver_id;
        $receiver_type = null;
        if ($request->room_type == 'Event_chat') {
            $receiver_type = \App\Models\EventApp::class;
        } elseif ($request->room_type == 'Group_chat') {
            $receiver_type = \App\Models\User::class;
        } elseif ($request->room_type == 'Private_chat') {
            $receiver_type = \App\Models\Attendee::class;
        }

        // check that both user initiate the chat
        if ($request->room_type == 'Private_chat') {
            $auth_user = ChatMember::where('event_id', $eventId)->where('user_id', $senderId)->where('participant_id', $receiver_id)->first();
            $participant_user = ChatMember::where('event_id', $eventId)->where('user_id', $receiver_id)->where('participant_id', $senderId)->first();
            if (!$auth_user) {
                $this->initiateChat($eventId, $senderId, \App\Models\User::class, $receiver_id, \App\Models\Attendee::class);
            }
            if (!$participant_user) {
                $this->initiateChat($eventId, $receiver_id, \App\Models\Attendee::class, $senderId, \App\Models\User::class);
            }
        }


        $message = ChatMessage::create([
            'event_id' => $eventId,
            'group_id' => $request->room_type == 'Group_chat' ? $receiver_id : null,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\User::class,
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
            // Event chat: increment unread for all other members in the event
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', '!=', $senderId)
            //     ->where('participant_type', \App\Models\EventApp::class)
            //     ->increment('unread_count');

            broadcast(new EventGroupChat($message))->toOthers();
        } elseif ($request->room_type == 'Group_chat') {
            // Group chat: increment unread only for the receiver
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', '!=', $senderId)
            //     ->where('group_id', $message->group_id)
            //     ->increment('unread_count');
            broadcast(new GroupChat($message))->toOthers();
        } elseif ($request->room_type == 'Private_chat') {
            // Private chat: increment unread only for the receiver
            // ChatMember::where('event_id', $eventId)
            //     ->where('user_id', $receiver_id)
            //     ->where('participant_id', $senderId)
            //     ->increment('unread_count');

            broadcast(new AttendeeChatMessage($message))->toOthers();
        }

        return response()->json(['success' => true, 'message' => $message]);
    }

    public function markAsRead($chatWithUserId)
    {
        $eventId = session('event_id');
        $userId = Auth::user()->id;

        ChatMember::where('event_id', $eventId)
            ->where('participant_id', $userId)
            ->where('user_id', $chatWithUserId)
            ->update(['unread_count' => 0]);

        return response()->json(['success' => true]);
    }

    // uses for chat initiate
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

    public function createRoom(Request $request)
    {
        $eventId = session('event_id');
        $userId = Auth::user()->id;

        $rules = [
            "type" => "required",
            "name" => "required",
            "image" => "nullable|image|mimes:jpg,jpeg,png,gif|max:2048",
            "visibility" => "required|in:public,private",
        ];

        // If private → require members
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
        return back()->withSuccess('Room Created Successfully');
    }

    // join public groups 

    public function join($id)
    {
        $group = ChatGroup::findOrFail($id);
        $eventId = session('event_id');
        $userId = Auth::user()->id;

        // Prevent duplicate join
        $alreadyMember = ChatMember::where('event_id', $eventId)->where('group_id', $group->id)->where('user_id', $userId)->exists();
        if ($alreadyMember) {
            return back()->withSuccess('Added successfully.');
        }
        ChatMember::create([
            'event_id' => $eventId,
            'group_id' => $group->id,
            'user_id' => $userId,
            'user_type' => \App\Models\User::class,
            'participant_id' => $group->created_by,
            'participant_type' => \App\Models\User::class,
        ]);
        // Return updated group with members
        return redirect()->route('organizer.events.chat.index')->withSuccess('Added successfully.');
    }
}
