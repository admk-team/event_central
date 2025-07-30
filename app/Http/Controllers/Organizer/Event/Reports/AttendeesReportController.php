<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendeesReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_attendee_report')) {
            abort(403);
        }

        $attendees = $this->datatable(Attendee::currentEvent()->with(['attendeeEventSessions', 'attendeeFavSession', 'payments', 'eventSelectedSessions', 'attendeePurchasedTickets']));
        // dd($attendees->toArray());
        return Inertia::render('Organizer/Events/Reports/AttendeeReport/Index', compact(
            'attendees',
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
