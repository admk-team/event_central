<?php

namespace App\Http\Controllers\Organizer\Event;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\TicketFeature;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TicketFeatureController extends Controller
{
    public function index(EventAppTicket $event_app_ticket)
    {
        // Log::info($event_app_ticket);
        // if ($event_app_ticket->id > 0) { // $event_app_ticket is always not null perhaps due to appended attribute in model.
        //     $features = DB::select("select f.id, f.organizer_id, f.event_app_id, f.name,
        //     selected.event_app_ticket_id as selected from ticket_features As f left join
        //     feature_ticket As selected on f.id = selected.ticket_feature_id and selected.event_app_ticket_id = " . $event_app_ticket->id);
        // } else {
        //     $features = DB::select("select f.id, f.organizer_id, f.event_app_id, f.name,
        //     null as selected from ticket_features as f");
        // }

        $features = $this->datatable(TicketFeature::currentEvent());
        return Inertia::render('Organizer/Events/TicketFeatures/Index', compact('features'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required|max:250',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
        ]);
        TicketFeature::create($request->all());
        return back()->withSuccess('Ticket Feature Created Successfully');
    }

    public function update(Request $request, TicketFeature $tickets_feature)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required|max:250',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
        ]);

        $tickets_feature->update($request->all());
        return back()->withSuccess('Ticket Feature Updated Successfully');
    }

    public function destroy(TicketFeature $tickets_feature)
    {
        $tickets_feature->delete();
        return back()->withSuccess('Ticket Feature Deleted Successfully');
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            TicketFeature::find($id)?->delete();
        }
    }

    public function getAllFeatures($event_app_ticket_id = null)
    {
        if ($event_app_ticket_id) { // $event_app_ticket is always not null perhaps due to appended attribute in model.
            $features = DB::select("select f.id, f.organizer_id, f.event_app_id, f.name, f.price, f.qty_total, f.qty_sold,
            selected.event_app_ticket_id as selected from ticket_features As f left join
            feature_ticket As selected on f.id = selected.ticket_feature_id and selected.event_app_ticket_id = " . $event_app_ticket_id);
        } else {
            $features = DB::select("select f.id, f.organizer_id, f.event_app_id, f.name, f.price, f.qty_total, f.qty_sold,
            null as selected from ticket_features as f");
        }

        return response()->json(['features' => $features]);
    }
}
