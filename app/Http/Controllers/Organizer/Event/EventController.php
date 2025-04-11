<?php

namespace App\Http\Controllers\Organizer\Event;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventAppCategory;
use App\Models\EventAppDate;
use App\Models\RecurringType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Organizer\Event\EventStoreRequest;
use App\Http\Requests\Organizer\Event\EventUpdateRequest;
use App\Models\EventAppImage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_events')) {
            abort(403);
        }

        $recurring_types = RecurringType::get();
        $event_category_types = EventAppCategory::get();
        $events = $this->datatable(
            EventApp::ofOwner()->with('images')->whereCanBeAccessedBy(Auth::user())
        );

        return Inertia::render('Organizer/Events/Index', [
            'events' => $events,
            'recurring_types' => $recurring_types,
            'event_category_types' => $event_category_types
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventStoreRequest $request)
    {
        if (! Auth::user()->can('create_events')) {
            abort(403);
        }

        $data = $request->validated();
        $data['organizer_id'] = Auth::user()->owner_id;

        // Create Event
        $event = EventApp::create($data);

        if (! Auth::user()->hasRole('owner')) { // Give access to creator
            $event->giveAccessTo(Auth::user());
        }

        // Save event start date in separate table
        EventAppDate::create(['event_app_id' => $event->id, 'date' => $data['start_date']]);

        // Save Event Log File
        $this->SaveLogoImage($event, $request);
        $this->SaveOtherImages($event, $request);
        // Set newly created event in session for making it currently selected event
        session()->put('event_id', $event->id);

        return back()->withSuccess('Event created successfully.');
    }

    public function selectEvent(Request $request, $id)
    {
        $event = EventApp::ofOwner()->find($id);

        if (! Auth::user()->can('edit_events', $event)) {
            abort(403);
        }

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
    public function update(EventUpdateRequest $request, EventApp $event_app)
    {
        if (! Auth::user()->can('edit_events', $event_app)) {
            abort(403);
        }

        Log::info($request->all());

        $data = $request->validated();

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
        $this->SaveOtherImages($event_app, $request);

        session()->put('event_id', $event_app->id);

        return back()->withSuccess('Event Updated successfully.');
    }

    /** organizer.events.destroy
     * Remove the specified resource from storage.
     */
    public function destroy(EventApp $event_app)
    {
        if (! Auth::user()->can('delete_events', $event_app)) {
            abort(403);
        }

        try {
            $event_app->delete();
            return back()->withMessage('Event Removed Successfully');
        } catch (Exception $ex) {
            return back()->withError($ex->getMessage());
        }
    }

    /**
     * Remove the specified resource from database.
     */
    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            $event = EventApp::find($id);

            if (! Auth::user()->can('delete_events', $event)) {
                abort(403);
            }

            $event?->delete();
        }
    }


    private function SaveLogoImage(EventApp $event, Request $request)
    {
        if ($request->hasFile('logo_file')) {
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

    private function SaveOtherImages(EventApp $event, Request $request)
    {
        if ($request->hasFile('image_files')) {
            $images = $request->file('image_files');
            foreach ($images as $image) {
                $imageFileName = $image->getClientOriginalName();
                $path = storage_path('app/public/events-images');
                $image->move(storage_path('app/public/events-images'), $imageFileName);
                EventAppImage::create([
                    'event_app_id' => $event->id,
                    'image_file_name' => $imageFileName,
                    'image_url' => 'events-images/' . $imageFileName,
                    'is_feature_image' => false
                ]);
            }
        }
    }

    public function storeImage(Request $request, EventApp $event_app)
    {
        if (! Auth::user()->can('edit_events', $event_app)) {
            abort(403);
        }

        $this->SaveOtherImages($event_app, $request);

        return back()->withSuccess('Image uploaded');
    }

    public function destroyImage(EventApp $event_app, EventAppImage $eventAppImage)
    {
        $eventAppImage->delete();
        return back()->withSuccess('Deleted successfully.');
    }
}
