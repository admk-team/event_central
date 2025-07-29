<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Mail\PrayerRequestStatusUpdated;
use App\Models\PrayerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PrayerRequestController extends Controller
{
    public function index($session_id)
    {
        $prayers = PrayerRequest::where('event_app_id',$session_id)->with(['attendee'])->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Prayer requests fetched successfully.',
            'data' => $prayers
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'message' => 'required',
            'status' => 'in:pending,approved,rejected',
        ]);

        $prayer = PrayerRequest::findOrFail($id);

        $newStatus = $request->input('status', 'pending');
        $statusChanged = $newStatus !== 'pending' && $prayer->status !== $newStatus;

        $prayer->message = $request->input('message');
        $prayer->status = $newStatus;
        $prayer->save();

        // Send email if status changed
        if ($statusChanged) {
            $prayerRequest = PrayerRequest::with(['eventApp', 'attendee'])->find($id);

            if ($prayerRequest && $prayerRequest->attendee && $prayerRequest->attendee->email) {
                Mail::to($prayerRequest->attendee->email)->send(new PrayerRequestStatusUpdated($prayerRequest));
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Prayer request updated successfully.',
            'data' => $prayer
        ], 200);
    }

    public function destroy($id)
    {
        $prayer = PrayerRequest::find($id);

        if (!$prayer) {
            return response()->json([
                'success' => false,
                'message' => 'Prayer request not found.'
            ], 404);
        }

        $prayer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Prayer request deleted successfully.'
        ], 200);
    }
}
