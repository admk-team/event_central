<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;

class QuestionnaireFormFieldController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'label' => 'required',
            'placeholder' => 'nullable',
            'description' => 'nullable',
            'options' => 'nullable|array',
            'multi_selection' => 'required|boolean',
            'is_required' => 'required|boolean',
        ]);

        $form = Form::where('event_app_id', session('event_id'))->where('type', 'questionnaire')->first();
        
        $form->fields()->create($request->input());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $questionnaire_form_fields = FormField::find($id);
        $request->validate([
            'type' => 'required',
            'label' => 'required',
            'placeholder' => 'nullable',
            'description' => 'nullable',
            'options' => 'nullable|array',
            'multi_selection' => 'required|boolean',
            'is_required' => 'required|boolean',
        ]);
        
        $questionnaire_form_fields->update($request->input());

        return back()->withSuccess("Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formField = FormField::find($id);
        $form = $formField->form;
        $formField->delete();
        
        // Disable form if there are no fields
        if ($form->fields->count() === 0) {
            $form->status = false;
            $form->save();
        }

        return back();
    }
}
