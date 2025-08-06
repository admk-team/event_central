<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventBadgeRequest;
use App\Models\EventApp;
use App\Models\EventBadge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventBadgeController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_event_badge')) {
            abort(403);
        }
    
        $data = $this->datatable(EventBadge::currentEvent());
        return Inertia::render('Organizer/Events/EventBadge/Index', compact('data'));
    }
    public function store(EventBadgeRequest $request)
    {
        if (! Auth::user()->can('create_event_badge')) {
            abort(403);
        }
        $data = null;
        $validatedData = $request->validated();
        $validatedData['event_app_id'] = session('event_id');
         // Create the PartnerLink record
        $data = EventBadge::create($validatedData);
        // Check if the data is successfully created
        if ($data) {
        // Save Event Log File
        $this->SaveIcon($data, $request);
            // Return success response
            return back()->withSuccess('Created Successfully');
        } else {
            // Return error response if app domain URL does not exist
            return $this->errorResponse(__('Not created'), 422);
        }
    }
    public function update(EventBadgeRequest $request, EventBadge $badge)
    {
        if (! Auth::user()->can('edit_event_badge', $badge)) {
            abort(403);
        }

        $validatedData = $request->validated();
        //Update Event fields
        $badge->update($validatedData);
        // Save Event Log File If changed
        $this->SaveIcon($badge, $request);
       

        return back()->withSuccess('EventBadge Updated successfully.');
    }

    public function destroy(EventBadge $refferal_link)
    {
        if (! Auth::user()->can('delete_event_badge')) {
            abort(403);
        }

        if (in_array($refferal_link->id, [Auth::id(), 1])) {
            return back()->withError('This user cannot be deleted');
        }

        $refferal_link->delete();

        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {   
        if (! Auth::user()->can('delete_event_badge')) {
            abort(403);
        }
        
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            EventBadge::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
    private function SaveIcon(EventBadge $badge, Request $request)
    {
        if ($request->hasFile('icon')) {
            $imageFileName = 'event-badge-' . $badge->id . '.' . $request->icon->extension();
            $path = storage_path('app/public/events/badges');
            if (file_exists($path . '/' . $imageFileName)) {
                unlink($path . '/' . $imageFileName);  //Delete previous file
            }
            $request->icon->move($path, $imageFileName);
            $badge->icon = 'events/badges/' . $imageFileName;
            $badge->save();
        }
    }
    
}
