<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function getEventDetail()
    {
        $events = [];
        return Inertia::render('Attendee/Index', compact('events'));
    }
}
