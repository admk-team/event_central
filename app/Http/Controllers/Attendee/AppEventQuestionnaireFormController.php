<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Sanctum\PersonalAccessToken;

class AppEventQuestionnaireFormController extends Controller
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

        $eventApp->load('questionnaireForm');
        
        if (!$eventApp->questionnaireForm) {
            $eventApp->questionnaireForm()->create([
                'title' => '',
                'description' => '',
                'status' => false,
                'type' => 'questionnaire',
            ]);
            $eventApp->load('questionnaireForm');
        }
        if (! $eventApp) {
            abort(404);
        }

        $form = $eventApp->questionnaireForm()->with('fields')->first();
        $submitted = false;
        if ($form) {
            $submitted = FormSubmission::where('form_id', $form->id)->where('attendee_id', $attendee->id)->exists();
        }
       
        return Inertia::render("Attendee/QuestionnaireForm/App", [
            'form' => $form,
            'eventApp' => $eventApp,
            'submitted' => $submitted,
            'token' => $request->token,
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

        $form = $eventApp->questionnaireForm()->with('fields')->first();

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

        $this->eventBadgeDetail('questionnaire', $eventApp->id,$formSubmission->attendee_id,$formSubmission->id);
        return back()->withSuccess("Updated");
    }
}
