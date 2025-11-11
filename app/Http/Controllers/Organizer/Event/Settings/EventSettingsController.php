<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\ReminderEventEmail;
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
        $reminderDays = ReminderEventEmail::where('event_app_id', $event->id)->get(['id', 'days']);
        $after_days = eventSettings()->getValue('after_days', '7');
        $follow_up_event = eventSettings()->getValue('follow_up_event', false);
        return Inertia::render("Organizer/Events/Settings/Event/Index", [
            'event' => $event,
            'enableTracks' => eventSettings()->getValue('enable_tracks', false),
            'organizer_chat' => eventSettings()->getValue('organizer_chat', false),
            'enableCheckIn' => eventSettings()->getValue('enable_check_in', false),
            'enablePrivateRegistraion' => eventSettings()->getValue('private_register', false),
            'reminderDays' => $reminderDays,
            'after_days' => $after_days,
            'tracks' => $tracks,
            'lasteventDate' => $lasteventDate,
            'closeRegistration' => $closeRegistration,
            'follow_up_event' => $follow_up_event,
        ]);
    }

    public function updateInfo(Request $request)
    {
        if (! Auth::user()->can('edit_events')) {
            abort(403);
        }
        $event = EventApp::find(session('event_id'));

        if ($request->filled('custom_theme')) {
            $event->update([
                'custom_theme' => $request->custom_theme,
            ]);
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

    public function toggleOrganizerChat()
    {
        $enableTracks = eventSettings()->getValue('organizer_chat', false);
        eventSettings()->set('organizer_chat', !$enableTracks);
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
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'days_before_event' => 'required|integer',
        ]);
        $eventId = session('event_id');

        ReminderEventEmail::updateOrCreate(
            ['id' => $validated['id'] ?? null],
            [
                'event_app_id' => $eventId,
                'days' => $validated['days_before_event'],
            ]
        );

        return back()->withSuccess('Reminder day updated successfully.');
    }

    public function removeReminderDays(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        ReminderEventEmail::destroy($request->id);

       return back()->withSuccess('Reminder day removed successfully.');
    }

    public function changeAfterEvent(Request $request)
    {
        $request->validate([
            'days_after_event' => 'required|integer|min:1|max:365',
        ]);
        eventSettings()->set('after_days', $request->days_after_event);

        return back()->withSuccess('After Event days updated successfully.');
    }
    public function followUpToggle(Request $request)
    {
        $follow_up_event = eventSettings()->getValue('follow_up_event', false);
        eventSettings()->set('follow_up_event', !$follow_up_event);
        return back()->withSuccess('After Event days updated successfully.');
    }
}
