<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Models\EventAppFee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventAppFeeRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventAppFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fees = $this->datatable(EventAppFee::currentEvent());
        return Inertia::render('Organizer/Events/TicketFees/Index', compact('fees'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(EventAppFeeRequest $request)
    {
        EventAppFee::create($request->all());
        return back()->withSuccess('Ticket Fee Created Successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(EventAppFeeRequest $request, EventAppFee $ticket_fee)
    {
        $ticket_fee->update($request->all());
        return back()->withSuccess('Ticket Fee Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventAppFee $ticket_fee)
    {
        $ticket_fee->delete();
        return back()->withSuccess('Ticket Fee Deleted Successfully');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_tickets')) {  //To be changed
            abort(403);
        }

        $ids = $request->get('ids');

        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($ids as $id) {
            EventAppFee::find($id)?->delete();
        }
    }
}
