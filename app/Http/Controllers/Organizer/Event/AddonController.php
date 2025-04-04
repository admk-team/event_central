<?php

namespace App\Http\Controllers\Organizer\Event;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\TicketFeature;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddonController extends Controller
{
    public function index(EventAppTicket $event_app_ticket)
    {

        $addons = $this->datatable(Addon::currentEvent());
        return Inertia::render('Organizer/Events/Addons/Index', compact('addons'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required|max:250',
            'price' => 'nullable|numeric',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
        ]);
        Addon::create($request->all());
        return back()->withSuccess('Addon Created Successfully');
    }

    public function update(Request $request, Addon $addon)
    {
        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'name' => 'required|max:250',
            'price' => 'nullable|numeric',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
        ]);

        $addon->update($request->all());
        return back()->withSuccess('Addon Updated Successfully');
    }

    public function destroy(Addon $addon)
    {
        $addon->delete();
        return back()->withSuccess('Addon Deleted Successfully');
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            Addon::find($id)?->delete();
        }
        return back()->withSuccess('Selected Addon(s) Deleted Successfully');
    }

    public function getAllAddons($event_app_ticket_id = null)
    {
        $addons = Addon::get();
        return response()->json(['addons' => $addons]);
    }
}
