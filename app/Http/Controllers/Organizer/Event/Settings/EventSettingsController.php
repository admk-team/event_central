<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventSettingsController extends Controller
{
    public function index(): Response
    {
        $event = EventApp::find(session('event_id'));
        return Inertia::render("Organizer/Events/Settings/Event/Index", compact('event'));
    }

    public function updateInfo(Request $request)
    {
        $input = $request->validate([
            'logo' => 'nullable',
            'name' => 'required',
            'description' => 'nullable',
            'location_base' => 'required',
        ]);

        $event = EventApp::find(session('event_id'));
        if($request->hasFile('logo')) {
            $name = uniqid() . '.' . $request->file('logo')->getClientOriginalExtension();
            $input['logo'] = $request->file('logo')->storeAs('events-avatars', $name, 'public');
        }
        $event->update($input);

        return back()->withSuccess('Saved');
    }

    public function destroyEvent(Request $request)
    {
        $currentEvent = EventApp::find(session('event_id'));

        $request->validate([
            'name' => "required|in:{$currentEvent->name}",
        ], [
            'name.in' => 'Incorrect event name',
        ]);

        $currentEvent->delete();

        return redirect()->route('organizer.events.index')->withSuccess('Event deleted successfully');
    }
}
