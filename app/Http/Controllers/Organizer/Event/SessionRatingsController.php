<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionRatingsController extends Controller
{
    public function index(EventSession $eventSession)
    {
        $eventSession->load(['attendees', 'attendeesRating']);
        return Inertia::render("Organizer/Events/SessionRatings/Index", compact([
            'eventSession',
        ]));
    }
}
