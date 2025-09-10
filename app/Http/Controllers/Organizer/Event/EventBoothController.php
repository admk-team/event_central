<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventBoothRequest;
use App\Mail\EventSponsorshipAwardedMail;
use App\Models\EventBooth;
use App\Models\Attendee; // <-- add this
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EventBoothController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_event_booth')) {
            abort(403);
        }

        $attendees = Attendee::currentEvent()->get();
        // Reuse your existing datatable() helper
        $data = $this->datatable(EventBooth::currentEvent());

        return Inertia::render('Organizer/Events/EventBooth/Index', compact('data', 'attendees'));
    }

    public function store(EventBoothRequest $request)
    {
        if (! Auth::user()->can('create_event_booth')) {
            abort(403);
        }

        $validated = $request->validated();
        $validated['event_app_id'] = session('event_id');

        // Derive status from attendee_id (do NOT trust client for status)
        $validated['status'] = !empty($validated['attendee_id']) ? 'soldout' : 'available';

        $booth = EventBooth::create($validated);

        if ($booth) {
            $this->sendEmail($booth);
            $this->saveLogo($booth, $request);
            return back()->withSuccess('Created Successfully');
        }

        return $this->errorResponse(__('Not created'), 422);
    }

    public function update(EventBoothRequest $request, EventBooth $booth)
    {
        if (! Auth::user()->can('edit_event_booth', $booth)) {
            abort(403);
        }

        // 1) Trust only validated fields; never trust client-provided 'status'
        $validated = $request->validated();
        unset($validated['status']);

        // 2) Normalize attendee_id: "" / 0 => null, else int
        $attendeeId = $request->filled('attendee_id')
            ? (int) $validated['attendee_id']
            : null;

        $validated['attendee_id'] = $attendeeId;

        // 3) Derive status from attendee_id
        $validated['status'] = $attendeeId ? 'soldout' : 'available';

        // 4) Fill once, detect what changed, then save once
        $booth->fill($validated);

        $attendeeDirty = $booth->isDirty('attendee_id');
        $statusDirty   = $booth->isDirty('status');

        // If nothing changed and no new logo uploaded, skip disk work
        $hasNewLogo = $request->hasFile('logo');
        if ($booth->isClean() && ! $hasNewLogo) {
            return back()->withSuccess('EventBooth Updated successfully.');
        }

        $booth->save();

        // 5) Save/replace logo if present
        $this->saveLogo($booth, $request);

        // 6) Email only when assignment changed to a real attendee OR status flipped to soldout
        if (($attendeeDirty && $booth->attendee_id) || ($statusDirty && $booth->status === 'soldout')) {
            $this->sendEmail($booth);
        }

        return back()->withSuccess('EventBooth Updated successfully.');
    }


    public function destroy(EventBooth $booth)
    {
        if (! Auth::user()->can('delete_event_booth')) {
            abort(403);
        }

        $booth->delete();
        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_event_booth')) {
            abort(403);
        }

        $request->validate(['ids' => 'required|array']);

        foreach ($request->ids as $id) {
            EventBooth::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }

    private function saveLogo(EventBooth $booth, Request $request): void
    {
        if ($request->hasFile('logo')) {
            $imageFileName = 'event-booth-' . $booth->id . '.' . $request->logo->extension();
            $path = storage_path('app/public/events/booths');

            if (! is_dir($path)) {
                @mkdir($path, 0775, true);
            }

            if (file_exists($path . '/' . $imageFileName)) {
                @unlink($path . '/' . $imageFileName);
            }

            $request->logo->move($path, $imageFileName);

            $booth->logo = 'events/booths/' . $imageFileName;
            $booth->save();
        }
    }
    private function sendEmail(EventBooth $booth): void
    {
        if ($booth->attendee_id) {
            $attendee = Attendee::where('id', $booth->attendee_id)->first();
            $eventapp = EventApp::where('id', $booth->event_app_id)->first();

            if ($attendee && $attendee->email && $eventapp) {
                // mirrors your style: Mail::to(...)->send(new ...)
                Mail::to($attendee->email)->send(
                    new EventSponsorshipAwardedMail($eventapp, $booth, $attendee)
                );
            }
        }
    }
}
