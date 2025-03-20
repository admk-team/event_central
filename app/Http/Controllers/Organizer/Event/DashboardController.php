<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAttendee = EventApp::where('organizer_id', Auth::user()->id)->withCount('attendees')->get()->sum('attendees_count');
        $totalSession = EventApp::where('organizer_id', Auth::user()->id)->withCount('event_sessions')->get()->sum('event_sessions_count');
        $totalTickets = EventApp::where('organizer_id', Auth::user()->id)->withCount('tickets')->get()->sum('tickets_count');
        return Inertia::render('Organizer/Events/Dashboard/index', compact('totalAttendee', 'totalSession','totalTickets'));
    }
}
