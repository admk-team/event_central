<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PrayerRequestController extends Controller
{
    public function index(Request $request)
    {
        // if (! Auth::user()->can('view_prayer_request')) {
        //     abort(403);
        // }

        $data = $this->datatable(
            PrayerRequest::currentEvent()->with(['attendee'])
        );
        return Inertia::render('Organizer/Events/PrayerRequest/Index', compact('data'));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'message' => 'required',
            'status' => 'in:pending,approved,rejected',
        ]);
        $prayer = PrayerRequest::findOrFail($id);
        $prayer->message = $request->input('message');
        $prayer->status = $request->input('status', 'pending');
        $prayer->save();

        return back()->withSuccess("Updated successfully");
    }
    public function destroy($id)
    {
        // if (! Auth::user()->can('delete_attendees')) {
        //     abort(403);
        // }

        PrayerRequest::find($id)->delete();
        return back()->withSuccess('Attendee deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_attendees')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            PrayerRequest::find($id)->delete();
        }
        return back()->withSuccess('Attendees deleted successfully.');
    }
}
