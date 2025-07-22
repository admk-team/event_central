<?php

namespace App\Http\Controllers\Organizer\Event;

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
        return Inertia::render('Organizer/Events/Chat/Index', compact('member', 'event_data','loged_user'));
    }

    public function getMessages()
    {
        $messages = ChatMessage::currentEvent()->with('sender')->get();
        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }
}
