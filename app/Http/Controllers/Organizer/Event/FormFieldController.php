<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;

class FormFieldController extends Controller
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

        $form = Form::where('event_app_id', session('event_id'))->where('type', 'registration')->first();
        
        $form->fields()->create($request->input());

        return back()->withSuccess('Created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FormField $form_field)
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
        
        $form_field->update($request->input());

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

        return back()->withSuccess('Deleted successfully.');
    }
}
