<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'event_speaker_id' => 'nullable|array', // Changed to array
            'event_speaker_id.*' => 'exists:event_speakers,id', // Validate each ID
            'event_date_id' => 'exists:event_app_dates,id',
            'event_platform_id' => 'exists:event_platforms,id',
            'type' => 'required|in:Session,Workshop,Break',
            'description' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1',
            'start_time' => 'required',
            'end_time' => 'required',
            'qa_status' => 'boolean',
            'posts' => 'required',
            'tracks' => 'array',
            'rating_status' => 'boolean',
            'price'=> 'nullable|numeric|min:0',
        ];
    }
}