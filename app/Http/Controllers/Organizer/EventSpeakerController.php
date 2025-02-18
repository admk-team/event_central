<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\organizer\EventSpeakerRequest;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Psy\Readline\Hoa\EventSource;

class EventSpeakerController extends Controller
{
    public function index(Request $request)
    {
        $speakers = EventSpeaker::latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Speekers/Index', compact('speakers'));
    }

    public function create()
    {
        // $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Organizer/Speekers/CreateOrEdit");
    }

    public function store(EventSpeakerRequest $request)
    {
        $input = $request->validated();
        // dd('after validate');
        EventSpeaker::create($input);

        return redirect()->route('organizer.speaker.index')->with('success', 'speaker created successfully.');
    }

    public function edit(string $id)
    {
        $speaker = EventSpeaker::findOrFail($id);
        return Inertia::render("Organizer/Speekers/CreateOrEdit", compact('speaker'));
    }

    public function update(EventSpeakerRequest $request, EventSpeaker $speaker)
    {
        $input = $request->validated();

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
