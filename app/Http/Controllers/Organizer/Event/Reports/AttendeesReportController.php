<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendeesReportController extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $query = Attendee::currentEvent()->with('eventCheckin');

        // Apply date range filter on created_at if provided
        if ($request->has(['start_date', 'end_date']) && $request->start_date && $request->end_date) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $attendees = $this->datatable($query);

        return Inertia::render('Organizer/Events/EventReports/AttendeeReport/Attendees', compact('attendees'));
    }
}
