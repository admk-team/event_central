<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventPost;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function pollToggle(Request $request)
    {
        $userId = Auth::id(); // Get the logged-in user ID
        $event = EventPost::where('id', $request->post_id)->first();

        if (!$event) {
            return abort(404);
        }

        $pollData = json_decode($event->post_poll, true);
        // Remove user ID from all "like" arrays
        foreach ($pollData as &$option) {
            $option['like'] = array_values(array_diff($option['like'], [$userId]));
        }
        // Add user ID to the selected option's "like" array
        $selectedOptionIndex = $request->option; // Ensure this is a valid index
        if (isset($pollData[$selectedOptionIndex])) {
            $pollData[$selectedOptionIndex]['like'][] = $userId;
        }
        // Encode data back to JSON and update the column
        $event->post_poll = json_encode($pollData);
        $event->save();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
