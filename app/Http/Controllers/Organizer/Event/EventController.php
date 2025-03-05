<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventStoreRequest;
use App\Models\EventApp;
use App\Models\EventAppCategory;
use App\Models\RecurringType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $events = EventApp::ofOwner()->get();
        $recurring_types = RecurringType::get();
        $event_category_types = EventAppCategory::get();
        $events = $this->datatable(EventApp::ofOwner());
        return Inertia::render('Organizer/Events/Index', [
            'events' => $events,
            'recurring_types' => $recurring_types,
            'event_category_types' => $event_category_types
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventStoreRequest $request)
    {
        $data = $request->validated();
        $data['organizer_id'] = Auth::id();
        $event = EventApp::create($data);
        session()->put('event_id', $event->id);
        return redirect()->route('organizer.events.dashboard')->withSuccess('Event created successfully.');
    }

    public function selectEvent(Request $request, $id)
    {
        $event = EventApp::ofOwner()->find($id);

        if (! $event) {
            abort(403);
        }

        session()->put('event_id', $id);

        $back = (bool) ($request->back ?? true);

        if ($back) {
            return back();
        }

        return redirect()->route('organizer.events.dashboard');
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
