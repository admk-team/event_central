<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Form;
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
            'is_required' => 'required|boolean',
        ]);

        $form = Form::where('event_app_id', session('event_id'))->first();
        
        $form->fields()->create($request->input());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
