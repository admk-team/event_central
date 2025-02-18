<?php

namespace App\Http\Requests\organizer;

use Illuminate\Foundation\Http\FormRequest;

class EventSpeakerRequest extends FormRequest
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
            'event_app_id' => 'required|',
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'web' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'country' => 'nullable|string|max:100',
            'language' => 'nullable|string|max:50',
        ];
    }
}
