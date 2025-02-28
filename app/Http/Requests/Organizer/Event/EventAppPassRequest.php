<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventAppPassRequest extends FormRequest
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
            'event_session_id' => 'exists:event_sessions,id',
            'name' => 'required',
            'description' => 'required',
            'type' => 'required',
            'price' => 'required|numeric',
            'increament_by' => 'required|numeric',
            'increament_rate' => 'required|numeric',
            'start_increament' => 'required|date',
            'end_increament' => 'required|date',
        ];
    }
}
