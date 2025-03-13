<?php

namespace App\Http\Controllers\Organizer\Event;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TicketFeature;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TicketFeatureController extends Controller
{
    public function index()
    {
        $features = DB::select("select f.id, f.organizer_id, f.event_app_id, f.name,
            selected.event_app_ticket_id as selected from ticket_features As f left join
            feature_ticket As selected on f.id = selected.ticket_feature_id");

        return response()->json(['features' => $features]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required:max:250'
        ]);
        TicketFeature::create($request->all());
        return back()->withSuccess('Ticket Feature Created Successfully');
    }

    public function update(Request $request, TicketFeature $tickets_feature)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required:max:250'
        ]);
        Log::info($request->all());
        $tickets_feature->update($request->all());
        return back()->withSuccess('Ticket Feature Updated Successfully');
    }

    public function destroy(TicketFeature $tickets_feature)
    {
        $tickets_feature->delete();
        return back()->withSuccess('Ticket Feature Deleted Successfully');
    }
}
