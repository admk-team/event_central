<?php

namespace App\Http\Controllers\Organizer\Event\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\User\AttendeeStoreRequest;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendeeController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->canAny(['view_users', 'create_users', 'edit'])) {
            abort(403);
        }

        $attendees = $this->datatable(Attendee::currentEvent());
        return Inertia::render('Organizer/Events/Users/Attendees/Index', compact('attendees'));
    }


    public function store(AttendeeStoreRequest $request)
    {
        $input = $request->validated();

        Attendee::create($input);

        return redirect()->route('organizer.events.attendees.index')->with('success', 'attendee created successfully.');
    }

    // public function edit(string $id)
    // {
    //     $attendee = Eventattendee::findOrFail($id);
    //     return Inertia::render("Organizer/Events/Speekers/CreateOrEdit", compact('attendee'));
    // }

    public function update(AttendeeStoreRequest $request, Attendee $attendee)
    {
        $input = $request->validated();

        $attendee->update($input);

        return back();
    }

    public function destroy(Attendee $attendee)
    {
        $attendee->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            Attendee::find($id)->delete();
        }
    }
}
