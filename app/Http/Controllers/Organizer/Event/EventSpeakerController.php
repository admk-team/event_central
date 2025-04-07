<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventSpeakerRequest;
use App\Models\EventApp;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Psy\Readline\Hoa\EventSource;

class EventSpeakerController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_speakers')) {
            abort(403);
        }

        $speakers = EventSpeaker::currentEvent()->latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Speekers/Index', compact('speakers'));
    }

    public function create()
    {
        if (! Auth::user()->can('create_speakers')) {
            abort(403);
        }

        // $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        $events = EventApp::ofOwner()->get();
        return Inertia::render("Organizer/Events/Speekers/CreateOrEdit", [
            'events' => $events
        ]);
    }

    public function store(EventSpeakerRequest $request)
    {
        if (! Auth::user()->can('create_speakers')) {
            abort(403);
        }

        $input = $request->validated();
        $input['event_app_id'] = session('event_id');
        if ($input['avatar'] && Storage::disk('public')->exists($input['avatar'])) {
            Storage::disk('public')->delete($input['avatar']);
        }
        if ($input['avatar'] && $input['avatar'] != null) {
            $name = uniqid() . '.' . $input['avatar']->getClientOriginalExtension();
            $input['avatar'] = $input['avatar']->storeAs('organizer/organizer-avatars', $name, 'public');
        }
        if (isset($input['language']) && $input['language'] != null) {
            $input['language'] = implode(",", $input['language']);
        }
        EventSpeaker::create($input);

        return redirect()->route('organizer.events.speaker.index')->withSuccess('success', 'Speaker created successfully.');
    }

    public function edit(string $id)
    {
        if (! Auth::user()->can('edit_speakers')) {
            abort(403);
        }

        $speaker = EventSpeaker::findOrFail($id);
        return Inertia::render("Organizer/Events/Speekers/CreateOrEdit", compact('speaker'));
    }

    public function update(EventSpeakerRequest $request, EventSpeaker $speaker)
    {
        if (! Auth::user()->can('edit_speakers')) {
            abort(403);
        }

        $input = $request->validated();
        $input['event_app_id'] = session('event_id');
        if ($input['avatar']) {
            if (Storage::disk('public')->exists($input['avatar'])) {
                Storage::disk('public')->delete($input['avatar']);
            }
            $name = uniqid() . '.' . $request->avatar->getClientOriginalExtension();
            $input['avatar'] = $request->avatar->storeAs('organizer/organizer-avatars', $name, 'public');
        } else {
            unset($input['avatar']);
        }
        if (isset($input['language']) && $input['language'] != null) {
            $input['language'] = implode(",", $input['language']);
        }

        $speaker->update($input);

        return redirect()->route('organizer.events.speaker.index')->withSuccess('success', 'Speaker updated successfully.');
    }

    public function destroy(EventSpeaker $speaker)
    {
        if (! Auth::user()->can('delete_speakers')) {
            abort(403);
        }

        $speaker->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_speakers')) {
            abort(403);
        }
        
        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            EventSpeaker::find($id)->delete();
        }
    }
}
