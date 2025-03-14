<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\organizer\Event\EventSessionRequest;
use App\Models\EventPlatform;
use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use App\Models\PlatForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventSessionController extends Controller
{
    public function index(Request $request)
    {
        $eventSessions = EventSession::with(['eventDate', 'eventPlatform'])->currentEvent()->get();
        $speakers = EventSpeaker::currentEvent()->get();
        $platforms = PlatForm::all();
        $eventPlatforms = EventPlatform::where('event_app_id', session('event_id'))->get();
        $eventDates = EventAppDate::where('event_app_id', session('event_id'))->orderBy('date')->get();

        return Inertia::render('Organizer/Events/Schedule/Index', compact('eventSessions', 'speakers', 'platforms', 'eventPlatforms', 'eventDates'));
    }

    public function store(EventSessionRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        EventSession::create($data);
        return back();
    }

    public function update(EventSessionRequest $request, EventSession $schedule)
    {
        $data = $request->validated();
        $schedule->update($data);
        return back();
    }

    public function destroy(EventSession $schedule)
    {
        $schedule->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventSession::find($id)?->delete();
        }
    }
}
