<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventPartner;
use App\Models\EventPost;
use App\Models\EventSpeaker;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAttendee = EventApp::where('organizer_id', Auth::user()->id)->where('id',session('event_id'))->withCount('attendees')->get()->sum('attendees_count');
        $totalSession = EventApp::where('organizer_id', Auth::user()->id)->where('id',session('event_id'))->withCount('event_sessions')->get()->sum('event_sessions_count');
        $totalTickets = EventApp::where('organizer_id', Auth::user()->id)->where('id',session('event_id'))->withCount('tickets')->get()->sum('tickets_count');
        $totalPartners = EventPartner::currentEvent()->count();
        $totalSpeakers = EventSpeaker::currentEvent()->count();
        $totalPosts = EventPost::currentEvent()->count();
        return Inertia::render('Organizer/Events/Dashboard/index', compact('totalAttendee', 'totalSession','totalPartners','totalSpeakers','totalTickets','totalPosts'));
    }
}
