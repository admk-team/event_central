<?php

namespace App\Http\Controllers\Organizer\Event\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\User\AttendeeStoreRequest;
use App\Models\Attendee;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        // attendee sessions
        $sessions = DB::table('attendee_event_session')
            ->join('event_sessions', 'attendee_event_session.event_session_id', '=', 'event_sessions.id')
            ->leftJoin('session_check_ins', function ($join) use ($id) {
                $join->on('event_sessions.id', '=', 'session_check_ins.session_id')
                    ->where('session_check_ins.attendee_id', '=', $id);
            })->where('attendee_event_session.attendee_id', $id)
            ->select(
                'event_sessions.name as session_name',
                'event_sessions.start_time',
                'event_sessions.end_time',
                'session_check_ins.checked_in as check_in_time',
                DB::raw("CASE WHEN session_check_ins.id IS NOT NULL THEN 'Checked In' ELSE 'Not Checked In' END as status")
            )->get();
        // attendee tickets
        $tickets = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->where('attendee_payments.attendee_id', $id)
            ->select(
                'event_app_tickets.name as ticket_name',
                'attendee_payments.amount_paid as amount',
                'attendee_payments.payment_method as type',
                'attendee_purchased_tickets.qty as qty'
            )->get();
        $user = Attendee::where('id', $id)->first();
        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $user = Attendee::find($id)->first();
        $attendee = FormSubmission::where('attendee_id', $id)->with('fieldValues', 'attendee', 'formFields')->get();
        return Inertia::render('Organizer/Events/Users/Attendees/AttendeeProfile/Profile', compact('attendee', 'user', 'sessions', 'tickets'));
    }
}
