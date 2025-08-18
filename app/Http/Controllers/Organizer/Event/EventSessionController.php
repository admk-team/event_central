<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Events\UpdateEventDashboard;
use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventSessionRequest;
use App\Models\EventPlatform;
use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use App\Models\PlatForm;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventSessionController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_event_sessions')) {
            abort(403);
        }

        $eventSessions = EventSession::with(['eventDate', 'eventPlatform', 'eventSpeakers', 'tracks'])
            ->currentEvent()
            ->whereCanBeAccessedBy(Auth::user())
            ->get();

        $speakers = EventSpeaker::currentEvent()->orderBy('name', 'ASC')->get();
        $platforms = PlatForm::orderBy('name', 'ASC')->get();
        $eventPlatforms = EventPlatform::where('event_app_id', session('event_id'))->get();
        $eventDates = EventAppDate::where('event_app_id', session('event_id'))->orderBy('date')->get();
        $tracks = Track::where('event_app_id', session('event_id'))->latest()->get();
        $enableTracks = eventSettings()->getValue('enable_tracks', false);

        return Inertia::render('Organizer/Events/Schedule/Index', compact('eventSessions', 'speakers', 'platforms', 'eventPlatforms', 'eventDates', 'tracks', 'enableTracks'));
    }

    public function store(EventSessionRequest $request)
    {
        if (! Auth::user()->can('create_event_sessions')) {
            abort(403);
        }

        $data = $request->validated();
        if ($data['type'] == "Break") {
            $data['qa_status'] = false;
            $data['posts'] = false;
            $data['rating_status'] = false;
        }
        $data['event_app_id'] = session('event_id');
        $data['current_capacity'] = max(0, $data['capacity'] - 1);
        // Remove event_speaker_id from main data since we'll handle it separately
        $speakers = $data['event_speaker_id'] ?? [];
        unset($data['event_speaker_id']);

        $tracksIds = $data['tracks'] ?? [];
        unset($data['tracks']);

        $session = EventSession::create($data);

        if (! Auth::user()->hasRole('owner')) { // Give access to creator
            $session->giveAccessTo(Auth::user());
        }

        if (!empty($speakers)) {
            $session->eventSpeakers()->sync($speakers);
        }

        $session->tracks()->sync($tracksIds);
        broadcast(new UpdateEventDashboard(session('event_id'),'New Session Created'))->toOthers();
        return back()->withSuccess("Session Created Successfully");
    }

    public function update(EventSessionRequest $request, EventSession $schedule)
    {
        if (! Auth::user()->can('edit_event_sessions', $schedule)) {
            abort(403);
        }

        $data = $request->validated();
        if ($data['type'] == "Break") {
            $data['qa_status'] = false;
            $data['posts'] = false;
            $data['rating_status'] = false;
        }

        // Handle speakers separately
        $speakers = $data['event_speaker_id'] ?? [];
        unset($data['event_speaker_id']);

        $tracksIds = $data['tracks'] ?? [];
        unset($data['tracks']);

        $schedule->update($data);
        $schedule->eventSpeakers()->sync($speakers);

        $schedule->tracks()->sync($tracksIds);

        return back()->withSuccess("Session Updated Successfully");
    }

    public function destroy(EventSession $schedule)
    {
        if (! Auth::user()->can('delete_event_sessions', $schedule)) {
            abort(403);
        }

        $schedule->delete();
        broadcast(new UpdateEventDashboard(session('event_id'),'Session Deleted'))->toOthers();
        return back()->withSuccess("Session Deleted Successfully");
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            $eventSession = EventSession::find($id);

            if (! Auth::user()->can('delete_event_sessions', $eventSession)) {
                abort(403);
            }

            $eventSession?->delete();
        }
        broadcast(new UpdateEventDashboard(session('event_id'),'Session Deleted'))->toOthers();
    }
}
