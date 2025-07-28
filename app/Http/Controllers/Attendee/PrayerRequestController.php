<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use App\Models\PrayerRequestView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PrayerRequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $eventAppId = $user->event_app_id;
        $attendeeId = $user->id;

        $myRequests = PrayerRequest::where('attendee_id', $attendeeId)
            ->where('event_app_id', $eventAppId)
            ->latest()
            ->get();

        $publicRequests = PrayerRequest::where('request_type', 'public')->with('attendee')
            ->where('attendee_id', '!=', $attendeeId)
            ->where('status','approved')
            ->where('event_app_id', $eventAppId)
         ->orderBy('count', 'desc')
            ->get();

        return Inertia::render('Attendee/PrayerRequest/Index', [
            'my_requests' => $myRequests,
            'public_requests' => $publicRequests,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'request_type' => 'required|in:public,private',
        ]);
        $user = Auth::user();
        $eventAppId = $user->event_app_id;
        $attendeeId = $user->id;

        PrayerRequest::create([
            'message' => $validated['message'],
            'request_type' => $validated['request_type'],
            'event_app_id' =>  $eventAppId,
            'attendee_id' =>  $attendeeId,
            'status' => 'pending',
            'count' => 0,
        ]);

        return back()->with('success', 'Prayer request submitted.');
    }
    public function view($id)
    {
        $attendeeId = auth()->id();

        $prayerRequest = PrayerRequest::findOrFail($id);

        // ❌ Don't count if the user is viewing their own request
        if ($prayerRequest->attendee_id == $attendeeId) {
            return response()->json(['count' => $prayerRequest->count]);
        }

        $alreadyViewed = PrayerRequestView::where('attendee_id', $attendeeId)
            ->where('prayer_request_id', $id)
            ->exists();

        if (!$alreadyViewed) {
            PrayerRequestView::create([
                'attendee_id' => $attendeeId,
                'prayer_request_id' => $id,
            ]);

            // ✅ Increment view count only for others
            $prayerRequest->increment('count');
        }

        return response()->json(['count' => $prayerRequest->count]);
    }

    public function update(Request $request, $id)
    {
        $prayer = PrayerRequest::findOrFail($id);

        if ($prayer->attendee_id !== auth()->user()->id) {
            abort(403);
        }

        $request->validate([
            'message' => 'required|string',
            'request_type' => 'required|in:public,private',
        ]);

        $prayer->update([
            'message' => $request->message,
            'request_type' => $request->request_type,
        ]);

        return back()->with('success', 'Prayer request updated.');
    }

    public function destroy($id)
    {
        $prayer = PrayerRequest::findOrFail($id);

        if ($prayer->attendee_id !== auth()->user()->id) {
            abort(403);
        }

        $prayer->delete();

        return back()->with('success', 'Prayer request deleted.');
    }
}
