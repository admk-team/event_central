<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventSettingsController extends Controller
{
    public function index(): Response
    {
        $event = EventApp::find(session('event_id'));
        return Inertia::render("Organizer/Events/Settings/Event/Index", compact('event'));
    }

    public function updateInfo(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'location_base' => 'required',
        ]);

        $event = EventApp::find(session('event_id'));
        $event->update($input);

        return back();
    }

    public function destroyEvent(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $currentEvent = EventApp::find(session('event_id'));

        if ($request->name !== $currentEvent->php_sapi_name) {
            return response()->json([
                'errors' => 'Incorrect event name',
            ]);
        }
    }
}
