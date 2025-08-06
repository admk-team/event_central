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
        $lastMessage = ChatMessage::currentEvent()->with('sender')->latest('created_at')->first();
        $unread_count = $member->unread_count ?? 0;

        return Inertia::render('Organizer/Events/Chat/Index', compact('member', 'event_data', 'loged_user', 'unread_count', 'lastMessage'));
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

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required',
            'reply_to' => 'nullable|exists:chat_messages,id',
            'files' => 'nullable|array',
        ]);

        $eventId = session('event_id');
        $senderId = Auth::user()->id;
        $message = ChatMessage::create([
            'event_id' => $eventId,
            'sender_id' => $senderId,
            'sender_type' => \App\Models\User::class,
            'receiver_id' => $eventId,
            'receiver_type' => \App\Models\EventApp::class,
            'message' => $request->message == 'media' ? "" : $request->message,
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
        // Increment unread_count for all other participants
        ChatMember::where('event_id', $eventId)
            ->where(function ($q) use ($senderId) {
                $q->where('participant_id', '!=', $senderId)
                    ->orWhere('user_id', '!=', $senderId);
            })
            ->increment('unread_count');
        broadcast(new EventGroupChat($message))->toOthers();
        return response()->json(['success' => true, 'message' => $message]);
    }
}
