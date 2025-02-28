<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventAppPassRequest;
use App\Models\EventAppPass;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Psy\Readline\Hoa\EventSource;

class PassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Passes are related to Event Session, Modifications will be required to link Passes with selected sessions
        $passes
            = $this->datatable(EventAppPass::with('session'));
        $speakers = null;
        $event_sessions = EventSession::currentEvent()->get();
        // return $event_sessions;
        return Inertia::render('Organizer/Events/Passes/Index', compact('passes', 'event_sessions'));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(EventAppPassRequest $request)
    {
        $data = $request->validated();
        EventAppPass::create($data);
        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventAppPassRequest $request, EventAppPass $pass)
    {
        $data = $request->validated();
        $pass->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventAppPass $pass)
    {
        $pass->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $ids = $request->get('ids');
        Log::info($ids);
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($ids as $id) {
            EventAppPass::find($id)?->delete();
        }
    }
}
