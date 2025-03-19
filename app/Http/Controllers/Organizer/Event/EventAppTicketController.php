<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventAppTicketRequest;
use App\Models\EventAppTicket;
use App\Models\EventSession;
use App\Models\TicketFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class EventAppTicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = $this->datatable(EventAppTicket::currentEvent()->with(['event', 'sessions']));
        $speakers = null;
        $sessions = EventSession::currentEvent()->select(['id as value', 'name as label'])->get();

        return Inertia::render('Organizer/Events/Tickets/Index', compact(['tickets', 'sessions']));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(EventAppTicketRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        $data['sessions'] = $this->transformSessions($data);

        // Log::info($data['sessions']);
        $ticket = EventAppTicket::create($data);

        $ticket->sessions()->sync($data['sessions']);
        $ticket->features()->sync($data['features']);

        return back()->withSuccess('Ticket created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventAppTicketRequest $request, EventAppTicket $ticket)
    {
        $data = $request->validated();
        $data['sessions'] = $this->transformSessions($data);
        $ticket->update($data);

        $ticket->sessions()->sync($data['sessions']);
        $ticket->features()->sync($data['features']);

        return back()->withSuccess('Ticket Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventAppTicket $ticket)
    {
        $ticket->delete();
        return back()->withSuccess('Ticket Removed Successfully');
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

    private function transformSessions($data)
    {
        $sessions = array_values($data['sessions']);
        $temp = [];
        foreach ($sessions as $session) {
            array_push($temp, $session['value']);
        }
        return $temp;
    }
}
