<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventSessionController extends Controller
{
    public function saveSession(Request $request, EventSession $eventSession)
    {
        $request->user()->eventSessions()->attach([$eventSession->id]);
        return back()->withSuccess("Event Session added to Attendee's List");
    }

    public function removeSession(Request $request, EventSession $eventSession)
    {
        $request->user()->eventSessions()->detach([$eventSession->id]);
        return back()->withSuccess("Event Session removed from Attendee's List");
    }
}
