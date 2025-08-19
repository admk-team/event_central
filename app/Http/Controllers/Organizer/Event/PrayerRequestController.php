<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Mail\PrayerRequestStatusUpdated;
use App\Models\PrayerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Traits\SendsWebPushNotifications;

class PrayerRequestController extends Controller
{
    use SendsWebPushNotifications;
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_prayer_request')) {
            abort(403);
        }

        $data = $this->datatable(PrayerRequest::currentEvent()->with(['attendee']));
        return Inertia::render('Organizer/Events/PrayerRequest/Index', compact('data'));
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

        // ✅ If status was changed from 'pending' to approved/rejected, send email
        if ($statusChanged) {
            $prayerRequest = PrayerRequest::with(['eventApp', 'attendee'])->find($id);

            if ($prayerRequest && $prayerRequest->attendee && $prayerRequest->attendee->email) {
                Mail::to($prayerRequest->attendee->email)->send(new PrayerRequestStatusUpdated($prayerRequest));
            }
            // Send Push Notification to the sender (attendee)
            $this->sendWebPushNotification(
                $prayerRequest->attendee->id,
                'Prayer Request',
                "Your prayer request has been " . ucfirst($prayerRequest->status) . ".",
                route('attendee.prayer')
            );
        }


        return back()->withSuccess("Updated successfully");
    }
    public function destroy($id)
    {
        if (! Auth::user()->can('delete_prayer_request')) {
            abort(403);
        }

        PrayerRequest::find($id)->delete();
        return back()->withSuccess('Deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_prayer_request')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            PrayerRequest::find($id)->delete();
        }
        return back()->withSuccess('Deleted successfully.');
    }
}
