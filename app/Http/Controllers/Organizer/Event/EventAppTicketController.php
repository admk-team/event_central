<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventAppTicketRequest;
use App\Models\Addon;
use App\Models\EventAppFee;
use App\Models\EventAppTicket;
use App\Models\EventSession;
use App\Models\EventTicketType;
use App\Models\TicketFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        if (! Auth::user()->can('view_tickets')) {
            abort(403);
        }

        $speakers = null;

        $tickets = $this->datatable(EventAppTicket::currentEvent()->with(['event', 'sessions', 'fees','ticketType']));
        $sessions = EventSession::currentEvent()->with('tracks')->get();
        $event_ticket_type = EventTicketType::where('event_app_id', session('event_id'))->latest()->get();
        $addons_collection = Addon::currentEvent()->orderBy('name')->get();
        $addons = $addons_collection->map(function ($addon) {
            return ['value' => $addon->id, 'label' => $addon->full_name];
        });

        $fees = EventAppFee::where('status', 'active')->currentEvent()->orderBy('name')->get();
        return Inertia::render('Organizer/Events/Tickets/Index', compact([
            'tickets',
            'sessions',
            'addons',
            'fees',
            'event_ticket_type'
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventAppTicketRequest $request)
    {
        if (! Auth::user()->can('create_tickets')) {
            abort(403);
        }

        $data = $request->validated();

        $data['event_app_id'] = session('event_id');
        $data['sessions'] = $this->transformSessions($data);
        $data['addons'] = $this->transformAddons($data);
        $data['fees'] = $this->transformFees($data);

        // Log::info($data['sessions']);
        $ticket = EventAppTicket::create($data);

        $ticket->sessions()->sync($data['sessions']);
        $ticket->addons()->sync($data['addons']);
        $ticket->fees()->sync($data['fees']);

        return back()->withSuccess('Ticket created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventAppTicketRequest $request, EventAppTicket $ticket)
    {
        if (! Auth::user()->can('edit_tickets')) {
            abort(403);
        }

        $data = $request->validated();

        $data['sessions'] = $this->transformSessions($data);
        $data['addons'] = $this->transformAddons($data);
        $data['fees'] = $this->transformFees($data);

        $ticket->update($data);

        $ticket->sessions()->sync($data['sessions']);
        $ticket->addons()->sync($data['addons']);
        $ticket->fees()->sync($data['fees']);

        return back()->withSuccess('Ticket Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventAppTicket $ticket)
    {
        if (! Auth::user()->can('delete_tickets')) {
            abort(403);
        }

        $ticket->delete();
        return back()->withSuccess('Ticket Removed Successfully');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_tickets')) {
            abort(403);
        }

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

    private function transformAddons($data)
    {
        $sessions = array_values($data['addons']);
        $temp = [];
        foreach ($sessions as $session) {
            array_push($temp, $session['value']);
        }
        return $temp;
    }
    private function transformFees($data)
    {
        $fees = array_values($data['fees']);
        $temp = [];
        foreach ($fees as $fee) {
            array_push($temp, $fee['id']);
        }
        return $temp;
    }
}
