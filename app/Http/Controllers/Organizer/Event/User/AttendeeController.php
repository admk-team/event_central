<?php

namespace App\Http\Controllers\Organizer\Event\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\User\AttendeeStoreRequest;
use App\Models\Attendee;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AttendeeController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $attendees = $this->datatable(Attendee::currentEvent());
        return Inertia::render('Organizer/Events/Users/Attendees/Index', compact('attendees'));
    }

 
    public function store(Request $request)
    {
        if (! Auth::user()->can('create_attendees')) {
            abort(403);
        }

        // dd($request->all(),Auth::user(),session('event_id'));
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:attendees,email',
        ]);
        if (!session()->has('event_id')) {
            return redirect()->back()->withErrors(['error' => 'Event ID not found in session.']);
        }
        $user = Attendee::create([
            'event_app_id' => session('event_id'),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make("12345678"),
        ]);
        return redirect()->route('organizer.events.attendees.index')->with('success', 'attendee created successfully.');
    }


    public function update(AttendeeStoreRequest $request, Attendee $attendee)
    {
        if (! Auth::user()->can('edit_attendees')) {
            abort(403);
        }

        $input = $request->validated();

        $attendee->update($input);

        return back();
    }

    public function updateAttendee(Request $request, $id)
    {
        if (! Auth::user()->can('edit_attendees')) {
            abort(403);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $user = Attendee::findOrFail($id);
        $user->update($request->all());

        return back()->withSuccess('success', 'Attendee updated successfully');
    }

    public function destroy(Attendee $attendee)
    {
        if (! Auth::user()->can('delete_attendees')) {
            abort(403);
        }

        $attendee->delete();
        return back()->withSuccess('Attendee deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_attendees')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            Attendee::find($id)->delete();
        }
        return back()->withSuccess('Attendees deleted successfully.');
    }


    public function showInfo(String $id)
    {
        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $user = Attendee::find($id)->first();
        $attendee = FormSubmission::where('attendee_id', $id)->with('fieldValues', 'attendee', 'formFields')->get();
        return Inertia::render('Organizer/Events/Users/Attendees/AttendeeProfile/Profile', compact('attendee','user'));
    }
}
