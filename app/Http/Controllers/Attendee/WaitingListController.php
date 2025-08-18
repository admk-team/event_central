<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\WaitingList;
use Illuminate\Http\Request;

class WaitingListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $data = $request->all();
        $waitList = WaitingList::where('attendee_id', $request->attendee_id)->where('event_app_ticket_id', $request->event_app_ticket_id);
        if ($waitList) {
            return back()->withError("Already in Waiting List");
        }
        WaitingList::updateOrCreate($data);
        return back()->withSuccess("Added in Waiting List Successfully");
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

        // $data = WaitingList::where('attendee_id', $request->attendee_id)->where('event_app_ticket_id', $request->event_app_ticket_id);
        // dd($data);
        // return back()->withSuccess("Added in Waiting List Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $data = WaitingList::where('attendee_id', $request->attendee_id)->where('event_app_ticket_id', $request->event_app_ticket_id);
        dd($data);
        return back()->withSuccess("Added in Waiting List Successfully");
    }
}
