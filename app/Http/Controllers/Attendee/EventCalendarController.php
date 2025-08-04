<?php

namespace App\Http\Controllers\Attendee;

use Inertia\Inertia;
use App\Models\EventApp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EventCalendarController extends Controller
{
    public function index()
    {
        $events = EventApp::find(Auth::user()->event_app_id);
        $events->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform', 'dates']);
        return Inertia::render('Attendee/Calendar/Index', compact([
            'events',
        ]));
    }
}
