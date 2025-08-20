<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Helpers\CsvExporter;

class SessionReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_session_report')) {
            abort(403);
        }
        $sessions = $this->datatable(EventSession::currentEvent()->with(['attendees', 'attendances', 'favSessions', 'tickets', 'attendeesRating']));
        // dd($sessions->toArray());
        return Inertia::render('Organizer/Events/Reports/SessionReport/Index', compact(
            'sessions',
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

    public function exportSessionData()
    {
        $sessions = EventSession::currentEvent()
            ->with(['attendees', 'attendances', 'favSessions', 'tickets', 'attendeesRating'])
            ->get()
            ->map(function ($session) {
                return [
                    $session->id,
                    $session->name,
                    $session->type,
                    $session->capacity ?? 0,
                    $session->attendees->count(),
                    $session->attendances->count(),
                    $session->favSessions->count(),
                    $session->attendeesRating->avg('rating') ?? 0,
                    $session->tickets->count(),
                ];
            })->toArray();

        return CsvExporter::export('sessions_report.csv', [
            [
                'columns' => [
                    'ID',
                    'Name',
                    'Type',
                    'Capacity',
                    'Attendees',
                    'Attendances',
                    'Favorites',
                    'Avg Rating',
                    'Tickets',
                ],
                'rows' => $sessions,
            ]
        ]);
    }
}
