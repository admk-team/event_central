<?php

namespace App\Http\Requests\organizer;

use Illuminate\Foundation\Http\FormRequest;

class EventSessionRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'event_speaker_id' => 'nullable|exists:event_speakers,id',
            'type' => 'required|in:Lecture,Workshop,Break',
            'description' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1|',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];
    }
}
