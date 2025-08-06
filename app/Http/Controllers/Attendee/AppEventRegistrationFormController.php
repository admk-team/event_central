<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Sanctum\PersonalAccessToken;

class AppEventRegistrationFormController extends Controller
{
    public function index(Request $request, EventApp $eventApp)
    {
        $accessToken = PersonalAccessToken::findToken($request->token);

        if (!$accessToken || ($accessToken->expires_at && $accessToken->expires_at->isPast()) || !$accessToken->can('role:attendee')) {
            abort(404);
        }

        $attendee = $accessToken->tokenable;

        if (!$eventApp || $eventApp->id !== $attendee->event_app_id) {
            abort(404);
        }

        $form = $eventApp->form()->with('fields')->first();

        if (!$form || !$form->status) {
            abort(404);
        }

        $formFilled = false;
        
        if ($form->submissions()->where('attendee_id', $attendee->id)->count() > 0) {
            $formFilled = true;
        }

        return Inertia::render("Attendee/Auth/AppEventRegistrationForm", [
            'form' => $form,
            'eventApp' => $eventApp,
            'token' => $request->token,
            'formFilled' => $formFilled,
        ]);
    }

    public function submit(Request $request, EventApp $eventApp)
    {
        $accessToken = PersonalAccessToken::findToken($request->token);

        if (!$accessToken || ($accessToken->expires_at && $accessToken->expires_at->isPast()) || !$accessToken->can('role:attendee')) {
            abort(404);
        }

        $attendee = $accessToken->tokenable;

        if (!$eventApp || $eventApp->id !== $attendee->event_app_id) {
            abort(404);
        }

        $form = $eventApp->form()->with('fields')->first();

        $validationRules = [];
        $validationMessages = [];
        foreach ($form->fields as $field) {
            if ($field->is_required) {
                $validationRules["field_{$field->id}"] = 'required';
                $validationMessages["field_{$field->id}.required"] = "{$field->label} is required";
            }
        }

        $request->validate($validationRules, $validationMessages);

        $formSubmission = FormSubmission::create([
            'form_id' => $form->id,
            'attendee_id' => $attendee->id,
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

        return to_route('attendee.app-event-registration-form', [
            'eventApp' => $eventApp->id,
            'token' => $request->token,
            'form_submitted' => 1, 
        ]);
    }
}
