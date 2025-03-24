<?php

namespace App\Http\Requests\Organizer\Event;

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
            'event_date_id' => 'exists:event_app_dates,id',
            'event_platform_id' => 'exists:event_platforms,id',
            'type' => 'required|in:Lecture,Workshop,Break',
            'description' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1|',
            'start_time' => 'required',
            'end_time' => 'required',
            'qa_status' => 'boolean',
        ];
    }
}
