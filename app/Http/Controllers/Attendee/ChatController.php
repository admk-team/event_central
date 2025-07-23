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
        $loged_user = Auth::user()->id;
        return Inertia::render('Attendee/Chat/Index', compact('member', 'event_data', 'loged_user'));
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

        $message = ChatMessage::create([
            'event_id' => Auth::user()->event_app_id,
            'sender_id' => Auth::user()->id,
            'sender_type' => \App\Models\Attendee::class,
            'message'=> $request->message,
        ]);
        $message->load('sender');
        broadcast(new EventGroupChat($message))->toOthers();
        return response()->json(['success' => true, 'message' => $message]);
    }
}
