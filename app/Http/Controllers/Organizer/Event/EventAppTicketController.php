<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventAppPassRequest;
use App\Models\EventAppTicket;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventAppTicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Passes are related to Event Session, Modifications will be required to link Passes with selected sessions
        $tickets
            = $this->datatable(EventAppTicket::with(['event']));
        $speakers = null;
        $sessions = EventSession::currentEvent()->get();
        // return $event_sessions;
        return Inertia::render('Organizer/Events/Tickets/Index', compact('tickets', 'sessions'));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(EventAppPassRequest $request)
    {
        $data = $request->validated();
        Log::info($data);
        EventAppTicket::create($data);
        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventAppPassRequest $request, EventAppTicket $eventAppTicket)
    {
        $data = $request->validated();
        $eventAppTicket->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventAppTicket $eventAppTicket)
    {
        $eventAppTicket->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $ids = $request->get('ids');
        // Log::info($ids);
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($ids as $id) {
            EventAppTicket::find($id)?->delete();
        }
    }
}
