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
            'type' => 'required',
            'price' => 'required|numeric',
            'sessions' => 'required|array',
            'sessions.*' => 'required|array|min:1'
            // 'increament_by' => 'required|numeric',
            // 'increament_rate' => 'required|numeric',
            // 'start_increament' => 'required|date',
            // 'end_increament' => 'required|date',
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
            // 'event_app_id' => 'exists:event_sessions,id',
            // 'event_app_id.required' => '',
            'name.required' => 'Ticket Name is required',
            'description' => 'Ticket description is required',
            'type.required' => 'Ticket type is required',
            'price.required' => 'Price is required',
            'price.numeric' => 'Price must be numeric',
            'sessions.required' => 'Event Session is required',
            'sessions.*.required' => 'At least one session is required'
            // 'increament_by' => 'required|numeric',
            // 'increament_rate' => 'required|numeric',
            // 'start_increament' => 'required|date',
            // 'end_increament' => 'required|date',
        ];
    }
}
