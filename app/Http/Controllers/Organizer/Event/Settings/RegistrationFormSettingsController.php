<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Form;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationFormSettingsController extends Controller
{
    public function index()
    {
        $currentEvent = EventApp::with('form')->find(session('event_id'));
        
        if (! $currentEvent->form) {
            $currentEvent->form()->create([
                'title' => '',
                'description' => '',
                'status' => false,
            ]);
            $currentEvent->load('form');
        }

        return Inertia::render("Organizer/Events/Settings/RegistrationForm/Index", [
            'url' => route('attendee.event-registration-form', $currentEvent->id),
            'form' => $currentEvent->form()->with('fields')->first(),
        ]);
    }

    public function toggleStatus()
    {
        $currentEvent = EventApp::with('form')->find(session('event_id'));
        $currentEvent->form->status = !$currentEvent->form->status;
        $currentEvent->form->save();
        return back()->withSuccess(!$currentEvent->form->status ? "Activated" : "Deactivated");
    }
}
