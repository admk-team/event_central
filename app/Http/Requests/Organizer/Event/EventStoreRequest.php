<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules()
    {
        return [
            'name'          => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'start_date'    => ['required', 'date', 'after_or_equal:today'],
            'location_type' => ['required', 'string', 'max:255'],
            'location_base' => ['required', 'string', 'max:255'],
            'type'          => ['required', 'string', 'max:255'],
            'schedual_type' => ['required', 'in:singleday,multiday'],
            'event_app_category_id' => 'required|numeric',
            'recurring_type_id' => 'required_with:is_recurring|numeric',
        ];
    }

    public function messages()
    {
        return [
            'name.required'          => 'Event name is required.',
            'description.required'   => 'Description is required.',
            'start_date.required'    => 'Start date is required.',
            'start_date.after_or_equal' => 'Start date must be today or later.',
            // 'end_date.required'      => 'End date is required.',
            // 'end_date.after'         => 'End date must be after the start date.',
            'location_type.required' => 'Location type is required.',
            'location_base.required' => 'Location base is required.',
            'type.required'          => 'Event type is required.',
            'schedual_type.required' => 'Schedule type is required.',
            'schedual_type.in'       => 'Schedule type must be one of: singleday, multiday, or recurring.',
            'event_app_category_id.required' => 'Choose Event Category Type',
            'recurring_type_id.required' => 'Choose Recurring Type',
        ];
    }
}
