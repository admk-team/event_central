<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventAppDate;
use Illuminate\Http\Request;

class EventDateController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        EventAppDate::create([
            'event_app_id' => session('event_id'),
            'date' => $request->date,
        ]);

        return back()->withSuccess('Created successfully.');
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
    public function destroy(EventAppDate $event_date)
    {
        $event_date->delete();
        return back()->withSuccess('Deleted successfully.');
    }
}
