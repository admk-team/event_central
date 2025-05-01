<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventCampaign;
use App\Http\Controllers\Controller;

class EmailCampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eventCampaigns = EventCampaign::where('event_app_id', session('event_id'))->get();

        return Inertia::render('Organizer/Events/EmailCampaigns/index', [
            'eventCampaigns' => $eventCampaigns,
        ]);
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
