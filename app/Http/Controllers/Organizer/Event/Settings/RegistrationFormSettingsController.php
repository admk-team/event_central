<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegistrationFormSettingsController extends Controller
{
    public function index()
    {
        if (! Auth::user()->can('edit_registration_form')) {
            abort(403);
        }

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
        if (! Auth::user()->can('edit_registration_form')) {
            abort(403);
        }

        $currentEvent = EventApp::with('form')->find(session('event_id'));
        $currentEvent->form->status = !$currentEvent->form->status;

        if ($currentEvent->form->status === true && $currentEvent->form->fields->count() === 0) {
            return back()->withError("Form has no fields, please add atleast one field");
        }

        $currentEvent->form->save();

        return back()->withSuccess(!$currentEvent->form->status ? "Activated" : "Deactivated");
    }
}
