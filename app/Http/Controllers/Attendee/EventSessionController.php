<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use App\Models\SessionCheckIn;
use App\Models\Att;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventSessionController extends Controller
{
    public function saveSession(Request $request, EventSession $eventSession, $type)
    {
        if ($type === 'select') {
            // ['rating' => 5, 'rating_description' => 'rating comments']
            $request->user()->eventSelectedSessions()->attach($eventSession->id);
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

    public function saveCheckIn(Request $request, EventSession $eventSession)
    {

        $payment = SessionCheckIn::where('attendee_id', auth()->user()->id)->where('session_id', $eventSession->id)->first();
        if ($payment) {
            return back()->withSuccess("Already Check In");
        } else {
            SessionCheckIn::create([
                'attendee_id' => auth()->user()->id,
                'session_id' => $eventSession->id,
                'checked_in' => Carbon::now()->toDateTimeString(),
                'qr_code' => auth()->user()->qr_code
            ]);
            return back()->withSuccess("Check In Successfully");
        }
    }
}
