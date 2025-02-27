<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
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
        return Inertia::render('Attendee/dashboard', compact('eventApp'));
    }
}
