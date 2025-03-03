<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
class EventSessionController extends Controller
{
    public function saveSession(Request $request, EventSession $eventSession, $type)
    {
        if ($type === 'select') {
            $request->user()->eventSelectedSessions()->attach($eventSession->id, ['rating' => 5, 'rating_description' => 'rating comments']);
            return back()->withSuccess("Event Session added to Attendee's List");
        } else {    //un-select
            $request->user()->eventSelectedSessions()->detach($eventSession->id);
            return back()->withSuccess("Event Session removed from Attendee's List");
        }
    }

    public function saveRating(Request $request, EventSession $eventSession)
    {
        $request->validate([
            'rating' => 'required|numeric',
            'rating_description' => 'required|string|max:255',
        ]);
        $data = $request->all();
        DB::table('attendee_event_session')->where(function ($query) use ($eventSession) {
            $query->where('attendee_id', auth()->user()->id);
            $query->where('event_session_id', $eventSession->id);
        })->update(['rating' => $data['rating'], 'rating_description' => $data['rating_description']]);

        return back()->withSuccess("Rating saved successfully");
    }
}
