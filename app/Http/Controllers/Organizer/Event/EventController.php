<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventStoreRequest;
use App\Models\EventApp;
use App\Models\EventAppCategory;
use App\Models\EventAppDate;
use App\Models\RecurringType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $data['organizer_id'] = Auth::user()->owner_id;

        // Create Event
        $event = EventApp::create($data);

        // Save event start date in separate table
        EventAppDate::create(['event_app_id' => $event->id, 'date' => $data['start_date']]);

        // Save Event Log File
        $this->SaveLogoImage($event, $request);

        // Set newly created event in session for making it currently selected event
        session()->put('event_id', $event->id);

        return back()->withSuccess('Event created successfully.');
    }

    private function SaveLogoImage(EventApp $event, Request $request)
    {
        if ($request->hasFile('logo_file')) {
            // Log::info('has file changed');
            $imageFileName = 'event-logo-' . $event->id . '.' . $request->logo_file->extension();
            $path = storage_path('app/public/events-avatars');
            if (file_exists($path . '/' . $imageFileName)) {
                unlink($path . '/' . $imageFileName);  //Delete previous file
            }
            $request->logo_file->move(storage_path('app/public/events-avatars'), $imageFileName);
            $event->logo = 'events-avatars/' . $imageFileName;
            $event->save();
        }
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
     * Update the specified resource in storage.
     */
    public function update(EventStoreRequest $request, EventApp $event_app)
    {
        // Log::info($request->all());

        $data = $request->validated();
        $data['organizer_id'] = Auth::id();

        //Update Event fields
        $event_app->update($data);

        //Update Event Date Date Time
        $event_date = $event_app->dates()->first();

        if ($event_date)
            $event_date->update(['date' => $data['start_date']]);
        else {
            EventAppDate::create(['date' => $data['start_date'], 'event_app_id' => $event_app->id]);
        }

        // Save Event Log File If changed
        $this->SaveLogoImage($event_app, $request);
        session()->put('event_id', $event_app->id);

        return back()->withSuccess('Event Updated successfully.');
    }

    /** organizer.events.destroy
     * Remove the specified resource from storage.
     */
    public function destroy(EventApp $event_app)
    {
        try {
            $event_app->delete();
            return back()->withMessage('Event Removed Successfully');
        } catch (Exception $ex) {
            return back()->withError($ex->getMessage());
        }
    }

    /** organizer.events.destroyMany
     * Remove the specified resource from database.
     */
    public function destroyMany(Request $request)
    {
        $ids = $request->get('ids');
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($ids as $id) {
            EventApp::find($id)?->delete();
        }
    }
}
