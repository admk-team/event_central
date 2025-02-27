<?php

namespace App\Http\Requests\Organizer\Event\Engagement;

use Illuminate\Foundation\Http\FormRequest;

class EventPostRequest extends FormRequest
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
            'title' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image',
            'send_notification' => 'boolean',
            'sending_date' => 'nullable|date',
            'sending_time' => 'nullable|date_format:H:i',
        ];
    }
}
