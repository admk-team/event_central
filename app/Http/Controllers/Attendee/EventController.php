<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function getEventDetail()
    {
        $events = [];
        return Inertia::render('Attendee/Index', compact('events'));
    }
    public function getEventDetailDashboard(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.event_speaker']);
        return Inertia::render('Attendee/AttendeeDashboard', compact('eventApp'));
    }
    public function getEventDetailAgenda(EventApp $eventApp)
    {
        $eventApp->load(['event_sessions.event_speaker']);
        return Inertia::render('Attendee/AttendeeAgenda', compact('eventApp'));
    }
    public function getEventSessionDetail(EventApp $eventApp, EventSession $eventSession)
    {
        $eventApp->load(['event_sessions.event_speaker']);
        return Inertia::render('Attendee/AttendeeSessionDetail', compact(['eventApp', 'eventSession']));
    }
}
