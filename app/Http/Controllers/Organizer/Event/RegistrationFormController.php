<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegistrationFormController extends Controller
{
    public function index($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event) {
            abort(404);
        }

        if (! Auth::guard('attendee')->check()) {
            return redirect()->route('attendee.register', $event);
        }

        $form = $event->form()->with('fields')->first();

        if (!$form || !$form->status) {
            abort(404);
        }

        return Inertia::render("Organizer/Events/RegistrationForm", [
            'form' => $form,
        ]);
    }

    public function submit($uuid, Request $request)
    {
        if (! Auth::guard('attendee')->check() && !$request->has('preview')) {
            return abort(401);
        }

        $event = EventApp::where('uuid', $uuid)->first();
        $form = $event->form()->with('fields')->first();

        $validationRules = [];
        $validationMessages = [];
        foreach ($form->fields as $field) {
            if ($field->is_required) {
                $validationRules["field_{$field->id}"] = 'required';
                $validationMessages["field_{$field->id}.required"] = "{$field->label} is required";
            }
        }

        $request->validate($validationRules, $validationMessages);

        if ($request->has('preview')) { // For Preview
            return back()->withSuccess('Form Submitted successfully');
        }

        $formSubmission = FormSubmission::create([
            'form_id' => $form->id,
            'attendee_id' => Auth::guard('attendee')->id(),
        ]);

        foreach ($form->fields as $field) {
            $fieldName = "field_{$field->id}";

            if (! $request->has($fieldName)) {
                continue;
            }

            $fieldValue = $request->input($fieldName);

            if (is_null($fieldValue)) {
                continue;
            }

            if ($field->multi_selection) {
                $fieldValue = json_encode($fieldValue);
            }

            $formSubmission->fieldValues()->create([
                'form_field_id' => $field->id,
                'value' => $fieldValue,
            ]);
        }

        return redirect()->intended(route('attendee.event.detail.dashboard', [$event]));
    }
}
