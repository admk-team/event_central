<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Mail\PrayerRequestSubmitted;
use App\Models\EventApp;
use App\Models\PrayerRequest;
use App\Models\PrayerRequestView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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

        $publicRequests = PrayerRequest::where('request_type', 'public')
            ->with('attendee')
            ->where('attendee_id', '!=', $attendeeId)
            ->where('status', 'approved')
            ->where('event_app_id', $eventAppId)
            ->orderBy('count', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'my_requests' => $myRequests,
            'public_requests' => $publicRequests
        ], 200);
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

        $prayerrequest = PrayerRequest::create([
            'message' => $validated['message'],
            'request_type' => $validated['request_type'],
            'event_app_id' => $eventAppId,
            'attendee_id' => $attendeeId,
            'status' => 'pending',
            'count' => 0,
        ]);

        $eventApp = EventApp::with('organiser')->find($eventAppId);

        if ($eventApp && $eventApp->organiser && $eventApp->organiser->email) {
            Mail::to($eventApp->organiser->email)->send(
                new PrayerRequestSubmitted($user, $eventApp, $prayerrequest)
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Prayer request submitted successfully.',
            'data' => $prayerrequest,
        ], 201);
    }

    public function view($id)
    {
        $attendeeId = auth()->id();
        $prayerRequest = PrayerRequest::findOrFail($id);

        // ❌ Don't count own view
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

            $prayerRequest->increment('count');
        }

        return response()->json(['count' => $prayerRequest->count]);
    }

    public function update(Request $request, $id)
    {
        $prayer = PrayerRequest::findOrFail($id);

        if ($prayer->attendee_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'message' => 'required|string',
            'request_type' => 'required|in:public,private',
        ]);

        $prayer->update([
            'message' => $request->message,
            'request_type' => $request->request_type,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prayer request updated successfully.',
            'data' => $prayer,
        ]);
    }

    public function destroy($id)
    {
        $prayer = PrayerRequest::findOrFail($id);

        if ($prayer->attendee_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $prayer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Prayer request deleted successfully.'
        ]);
    }
}
