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
        if (! Auth::user()->canAny(['view_event_sessions', 'create_event_sessions', 'edit_event_sessions', 'delete_event_sessions'])) {
            abort(403);
        }

        $eventSessions = EventSession::with(['eventDate', 'eventPlatform'])
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
        $data['event_app_id'] = session('event_id');
        EventSession::create($data);
        return back();
    }

    public function update(EventSessionRequest $request, EventSession $schedule)
    {
        if (! Auth::user()->can('edit_event_sessions', $schedule)) {
            abort(403);
        }

        $data = $request->validated();
        $schedule->update($data);
        return back();
    }

    public function destroy(EventSession $schedule)
    {
        if (! Auth::user()->can('delete_event_sessions', $schedule)) {
            abort(403);
        }

        $schedule->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        
        foreach ($request->ids as $id) {
            $schedule = EventSession::find($id);

            if (! Auth::user()->can('delete_event_sessions', $schedule)) {
                abort(403);
            }

            $schedule?->delete();
        }
    }
}
