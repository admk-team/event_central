<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Helpers\CsvExporter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;
use App\Models\SessionCheckIn;
use App\Models\EventSession;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SessionAttendanceController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_session_attendence')) {
            abort(403);
        }

        $eventSessions = EventSession::currentEvent() // Fetch all sessions for the current event
            ->whereCanBeAccessedBy(Auth::user())
            ->get();
        $attendance = $this->datatable(SessionCheckIn::with(['session', 'attendee']) // Eager load
            ->currentEvent()); // Replace datatable with standard query
        if ($request->has('session_id') && !empty($request->session_id)) {
            $attendance = $this->datatable(SessionCheckIn::where('session_id', $request->session_id)->with(['session', 'attendee']) // Eager load
                ->currentEvent());
        }
        // If you want to support AJAX polling, ensure JSON response for non-Inertia requests
        if ($request->wantsJson()) {
            return response()->json([
                'attendance' => $attendance,
                'eventSession' => $eventSessions,
            ]);
        }

        return Inertia::render('Organizer/Events/SessionAttendance/Index', [
            'attendance' => $attendance,
            'eventSession' => $eventSessions, // Pass sessions for dropdown
        ]);
    }

    public function destroy($id)
    {
        if (! Auth::user()->can('delete_session_attendence')) {
            abort(403);
        }

        $speaker = SessionCheckIn::findorFail($id);
        $speaker->delete();
        return back()->withSuccess('Deleted successfully');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_session_attendence')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);

        foreach ($request->ids as $id) {
            SessionCheckIn::find($id)->delete();
        }
    }

    public function exportData($sessionId = null)
    {
        $sessionCheckIns = SessionCheckIn::with(['session', 'attendee'])
            ->where('event_app_id', session('event_id'))
            ->when($sessionId, fn($q) => $q->where('session_id', $sessionId))
            ->get()
            ->map(function ($row) {
                return [
                    $row->id,
                    $row->attendee->first_name . ' ' . $row->attendee->last_name,
                    $row->session->name,
                    $row->checked_in ?? 'Not checked in',
                ];
            })->toArray();

        return CsvExporter::export('session_checkins.csv', [
            [
                'title' => 'Session Check-ins',
                'columns' => ['ID', 'Attendee Name', 'Session Name', 'Checked In'],
                'rows' => $sessionCheckIns,
            ]
        ]);
    }
}
