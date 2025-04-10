<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuestionnaireFormSettingsController extends Controller
{
    public function index()
    {
        if (! Auth::user()->can('edit_questionnaire_form')) {
            abort(403);
        }

        $currentEvent = EventApp::with('questionnaireForm')->find(session('event_id'));
        
        if (! $currentEvent->questionnaireForm) {
            $currentEvent->questionnaireForm()->create([
                'title' => '',
                'description' => '',
                'status' => false,
                'type' => 'questionnaire',
            ]);
            $currentEvent->load('questionnaireForm');
        }

        return Inertia::render("Organizer/Events/Settings/QuestionnaireForm/Index", [
            'url' => route('attendee.event-registration-form', $currentEvent->id),
            'form' => $currentEvent->questionnaireForm()->with('fields')->first(),
        ]);
    }
    public function response(Request $request)
    {
        if (! Auth::user()->can('questionnaire_response')) {
            abort(403);
        }
        $currentEvent = EventApp::with('questionnaireForm')->find(session('event_id'));
        
        if (! $currentEvent->questionnaireForm) {
            $currentEvent->questionnaireForm()->create([
                'title' => '',
                'description' => '',
                'status' => false,
                'type' => 'questionnaire',
            ]);
            $currentEvent->load('questionnaireForm');
        }

       $form = $currentEvent->questionnaireForm()->with('fields')->first();
       $submissions = $this->datatable($form->submissions()->with(['attendee', 'fieldValues']));
        return Inertia::render('Organizer/Events/Settings/QuestionnaireForm/Response', compact('submissions','form'));
    }

    public function toggleStatus()
    {
        if (! Auth::user()->can('edit_questionnaire_form')) {
            abort(403);
        }

        $currentEvent = EventApp::with('questionnaireForm')->find(session('event_id'));
        $currentEvent->questionnaireForm->status = !$currentEvent->questionnaireForm->status;

        if ($currentEvent->questionnaireForm->status === true && $currentEvent->questionnaireForm->fields->count() === 0) {
            return back()->withError("Form has no fields, please add atleast one field");
        }

        $currentEvent->questionnaireForm->save();

        return back()->withSuccess(!$currentEvent->questionnaireForm->status ? "Activated" : "Deactivated");
    }

    public function destroy($id)
    {
        if (! Auth::user()->can('delete_questionnaire_response')) {
            abort(403);
        }
        FormSubmission::find($id)?->delete();
        return back()->withSuccess('Deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_questionnaire_response')) {
            abort(403);
        }
        
        // dd('tsign');
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            FormSubmission::find($id)?->delete();
        }
        return back()->withSuccess('Deleted successfully.');
    }
}

