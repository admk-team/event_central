<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventSessionRequest;
use App\Models\EventPlatform;
use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use App\Models\PlatForm;
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

        $eventSessions = EventSession::with(['eventDate', 'eventPlatform', 'eventSpeakers'])
            ->currentEvent()
            ->whereCanBeAccessedBy(Auth::user())
            ->get();
        $speakers = EventSpeaker::currentEvent()->get();
        $platforms = PlatForm::all();
        $eventPlatforms = EventPlatform::where('event_app_id', session('event_id'))->get();
        $eventDates = EventAppDate::where('event_app_id', session('event_id'))->orderBy('date')->get();

        return Inertia::render('Organizer/Events/Schedule/Index', compact('eventSessions', 'speakers', 'platforms', 'eventPlatforms', 'eventDates'));
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
        }
        $data['event_app_id'] = session('event_id');
        
        // Remove event_speaker_id from main data since we'll handle it separately
        $speakers = $data['event_speaker_id'] ?? [];
        unset($data['event_speaker_id']);
        
        $session = EventSession::create($data);
        if (!empty($speakers)) {
            $session->eventSpeakers()->sync($speakers);
        }

        return back()->withSuccess("Session Created Successfully");
    }

    public function update(EventSessionRequest $request, EventSession $eventSession)
    {
        if (! Auth::user()->can('edit_event_sessions', $eventSession)) {
            abort(403);
        }

        $data = $request->validated();
        if ($data['type'] == "Break") {
            $data['qa_status'] = false;
            $data['posts'] = false;
        }
        
        // Handle speakers separately
        $speakers = $data['event_speaker_id'] ?? [];
        unset($data['event_speaker_id']);
        
        $eventSession->update($data);
        if (!empty($speakers)) {
            $eventSession->eventSpeakers()->sync($speakers);
        }

        return back()->withSuccess("Session Updated Successfully");
    }

    public function destroy(EventSession $eventSession)
    {
        if (! Auth::user()->can('delete_event_sessions', $eventSession)) {
            abort(403);
        }

        $eventSession->delete();
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
    }
}
