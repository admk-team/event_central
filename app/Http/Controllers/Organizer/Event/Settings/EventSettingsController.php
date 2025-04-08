<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;

class EventSettingsController extends Controller
{
    public function index(): Response
    {
        if (! Auth::user()->canAny(['edit_events', 'delete_events'])) {
            abort(403);
        }

        $event = EventApp::find(session('event_id'));
        $tracks = Track::where('event_app_id', session('event_id'))->latest()->get(); // For Track Manager
        
        return Inertia::render("Organizer/Events/Settings/Event/Index", [
            'event' => $event,
            'enableTracks' => eventSettings()->getValue('enable_tracks', false),
            'tracks' => $tracks,
        ]);
    }

    public function updateInfo(Request $request)
    {
        if (! Auth::user()->can('edit_events')) {
            abort(403);
        }

        $input = $request->validate([
            'logo' => 'nullable',
            'name' => 'required',
            'tagline' => 'nullable',
            'description' => 'nullable',
            'location_base' => 'required',
            'registration_private' => 'required',
            'registration_link' => $request->get('registration_private') == 1 ? 'required' : '',
        ]);

        $event = EventApp::find(session('event_id'));
        // Log::info($input);

        eventSettings()->set('registration_private', $input['registration_private']);
        if ($input['registration_private'] == 1) {
            eventSettings()->set('registration_link', $input['registration_link']);
        } else {
            eventSettings()->set('registration_link', '');
        }

        if($request->hasFile('logo')) {
            $name = uniqid() . '.' . $request->file('logo')->getClientOriginalExtension();
            $input['logo'] = $request->file('logo')->storeAs('events-avatars', $name, 'public');
        }
        $event->update($input);

        return back()->withSuccess('Saved');
    }




    public function destroyEvent(Request $request)
    {
        if (! Auth::user()->can('delete_events')) {
            abort(403);
        }

        $currentEvent = EventApp::find(session('event_id'));

        $request->validate([
            'name' => "required|in:{$currentEvent->name}",
        ], [
            'name.in' => 'Incorrect event name',
        ]);

        $currentEvent->delete();

        return redirect()->route('organizer.events.index')->withSuccess('Event deleted successfully');
    }

    public function generateLink()
    {
        // $url = route('attendee.register', session('event_id')) . '/' . str()->random();
        // $url = URL::signedRoute('attendee.register', session('event_id'), absolute: false); Regisration URL without domain name

        return response()->json(['link' => URL::signedRoute('attendee.register', session('event_id'))]);
    }

    public function toggleTracks()
    {
        $enableTracks = eventSettings()->getValue('enable_tracks', false);
        eventSettings()->set('enable_tracks', !$enableTracks);
    }
}
