<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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

        $event = EventApp::with('images')->find(session('event_id'));
        $tracks = Track::where('event_app_id', session('event_id'))->latest()->get(); // For Track Manager
        $lasteventDate = $event->dates()->orderBy('date', 'desc')->get();
        $closeRegistration = eventSettings()->getValue('close_registration', false);
        $reminderDays = eventSettings()->getValue('reminder_days', '7');

        return Inertia::render("Organizer/Events/Settings/Event/Index", [
            'event' => $event,
            'enableTracks' => eventSettings()->getValue('enable_tracks', false),
            'enableCheckIn' => eventSettings()->getValue('enable_check_in', false),
            'enablePrivateRegistraion' => eventSettings()->getValue('private_register', false),
            'reminderDays' => $reminderDays,
            'tracks' => $tracks,
            'lasteventDate' => $lasteventDate,
            'closeRegistration' => $closeRegistration,
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
            'custom_theme' => 'required',
        ]);

        $event = EventApp::find(session('event_id'));
        // Log::info($input);

        eventSettings()->set('registration_private', $input['registration_private']);
        if ($input['registration_private'] == 1) {
            eventSettings()->set('registration_link', $input['registration_link']);
        } else {
            eventSettings()->set('registration_link', '');
        }

        if ($request->hasFile('logo')) {
            $name = uniqid() . '.' . $request->file('logo')->getClientOriginalExtension();
            $event->logo = $request->file('logo')->storeAs('events-avatars', $name, 'public');
            $event->save();
        }
        $event->update($input);

        Cache::forget("current_event_" . Auth::id());

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

    public function toggleCheckIn()
    {
        $enableTracks = eventSettings()->getValue('enable_check_in', false);
        eventSettings()->set('enable_check_in', !$enableTracks);
    }
    public function togglePrivateRegister()
    {
        $enableTracks = eventSettings()->getValue('private_register', false);
        eventSettings()->set('private_register', !$enableTracks);
    }

    public function closeOpenRegistration($eventId)
    {

        $closeOpenRegistration = eventSettings()->getValue('close_registration', false);
        eventSettings()->set('close_registration', !$closeOpenRegistration);

        if ($closeOpenRegistration) {
            return redirect()->route('organizer.events.settings.event.index')->withSuccess('Event registration open successfully');
        } else {
            return redirect()->route('organizer.events.settings.event.index')->withSuccess('Event registration close successfully');
        }
    }

    public function changeReminderDays(Request $request)
    {
        $request->validate([
            'days_before_event' => 'required|integer|min:1|max:365',
        ]);

        eventSettings()->set('reminder_days', $request->days_before_event);

        return back()->with('success', 'Reminder days updated successfully.');
    }
}
