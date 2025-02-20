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
        $speakers = EventSpeaker::currentEvent()->latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Speekers/Index', compact('speakers'));
    }

    public function create()
    {
        // $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        $events = EventApp::organizer()->get();
        return Inertia::render("Organizer/Events/Speekers/CreateOrEdit",[
            'events' => $events
        ]);
    }

    public function store(EventSpeakerRequest $request)
    {
        $input = $request->validated();
        if ($input['avatar'] && Storage::disk('public')->exists($input['avatar'])) {
            Storage::disk('public')->delete($input['avatar']);
        }
        if ($input['avatar'] && $input['avatar'] != null) {
            $name = uniqid() . '.' . $input['avatar']->getClientOriginalExtension();
            $input['avatar'] = $input['avatar']->storeAs('organizer/organizer-avatars', $name, 'public');
        }

        EventSpeaker::create($input);

        return redirect()->route('organizer.events.speaker.index')->with('success', 'speaker created successfully.');
    }

    public function edit(string $id)
    {
        $speaker = EventSpeaker::findOrFail($id);
        return Inertia::render("Organizer/Events/Speekers/CreateOrEdit", compact('speaker'));
    }

    public function update(EventSpeakerRequest $request, EventSpeaker $speaker)
    {
        $input = $request->validated();
        if ($input['avatar'] && Storage::disk('public')->exists($input['avatar'])) {
            Storage::disk('public')->delete($input['avatar']);
        }
        $name = uniqid() . '.' . $input['avatar']->getClientOriginalExtension();
        $input['avatar'] = $input['avatar']->storeAs('organizer/organizer-avatars', $name, 'public');


        $speaker->update($input);

        return back();
    }

    public function destroy(EventSpeaker $speaker)
    {
        $speaker->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            EventSpeaker::find($id)->delete();
        }
    }
}
