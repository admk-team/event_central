<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventAppTicketRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            // 'event_app_id' => 'exists:event_sessions,id',
            'event_app_id' => '',
            'name' => 'required',
            'description' => 'required',
            'type' => 'nullable',
            'base_price' => 'required|numeric',

            'sessions' => 'required|array',
            'sessions.*' => 'required|array|min:1',
            'addons' => 'array',
            'fees' => 'array',
            'features' => '',
            'increment_by' => 'nullable',
            'increment_rate' => 'nullable',
            'increment_type' => 'nullable',
            'start_increment' => 'nullable',
            'end_increment' => 'nullable',
            'show_on_attendee_side' => '',
            'qty_total' => 'nullable',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Ticket Name is required',
            'description' => 'Ticket description is required',
            'type.required' => 'Ticket type is required',
            'base_price.required' => 'Price is required',
            'base_price.numeric' => 'Price must be numeric',
            // 'addons_price.required' => 'Price is required',
            // 'addons_price.numeric' => 'Price must be numeric',
            // 'total_price.required' => 'Price is required',
            // 'total_price.numeric' => 'Price must be numeric',
            'sessions.required' => 'Event Session is required',
            'sessions.*.required' => 'At least one session is required',
            // 'increment_by.numeric' => 'Increment by must be numeric',
            // 'increment_rate.numeric' => 'Increment rate must be numeric',
            // 'increment_type.string' => 'Increment Type must be Fixed or Percentage',
            // 'start_increment.datetime' => 'Start Increment must be date/time',
            // 'end_increment.datetime' => 'End Increment must be date/time',
        ];
    }
}
