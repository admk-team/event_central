<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventQuestionnaireFormController extends Controller
{
    public function index()
    {
        // $eventApp = EventApp::find(Auth::user()->event_app_id);
        $eventApp = EventApp::with('questionnaireForm')->find(Auth::user()->event_app_id);
        
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

        if (! Auth::guard('attendee')->check()) {
            return redirect()->route('attendee.register', $eventApp);
        }
        // dd( $eventApp);

        $form = $eventApp->questionnaireForm()->with('fields')->first();
        $submitted = false;
        if ($form && Auth::check()) {
            $submitted = FormSubmission::where('form_id', $form->id)->where('attendee_id', Auth::user()->id)->exists();
        }
       
        return Inertia::render("Attendee/QuestionnaireForm/Index", [
            'form' => $form,
            'eventApp' => $eventApp,
            'submitted' => $submitted,
        ]);
    }

    public function submit(Request $request, EventApp $eventApp)
    {
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        if (! Auth::guard('attendee')->check() && !Auth::guard('web')->check()) {
            return abort(401);
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

        if (Auth::guard('web')->check()) { // For Preview
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

        $this->eventBadgeDetail('questionnaire', $eventApp->id,$formSubmission->attendee_id,$formSubmission->id);
        return back()->withSuccess("Updated");
    }
}
