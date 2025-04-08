<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'color' => 'required',
        ]);

        $input = $request->input();
        $input['event_app_id'] = session('event_id');

        Track::create($input);

        return back()->withSuccess("Created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Track $track)
    {
        $request->validate([
            'name' => 'required',
            'color' => 'required',
        ]);

        $input = $request->input();
        
        $track->update($input);

        return back()->withSuccess("Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Track $track)
    {
        $track->delete();
        return back()->withSuccess("Deleted");
    }
}
