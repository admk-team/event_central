<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventSessionRequest;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventSessionController extends Controller
{
    public function index(Request $request)
    {
        $event_app = EventApp::find(session('event_id'));
        $schedules = EventSession::currentEvent()->with('event_speaker')->latest()->paginate($request->per_page ?? 10);
        $speakers = EventSpeaker::currentEvent()->get();
        return Inertia::render('Organizer/Events/Schedule/Index', compact('schedules', 'speakers', 'event_app'));
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

    public function destroyMany(Request $request){
        $request->validate([
            'ids'=> 'required|array'
        ]);
        foreach($request->ids as $id){
            EventSession::find($id)?->delete();
        }
    }
}
