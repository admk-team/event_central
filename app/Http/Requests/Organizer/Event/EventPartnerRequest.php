<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventPartnerRequest extends FormRequest
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
            'event_app_id' => 'required|exists:event_apps,id',
            'type' => 'required|in:exhibitor,sponsor',
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'web' => 'nullable|url|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'exhibitor_logo' => 'nullable|string|max:255',
            'exhibitor_booth_no' => 'nullable|string|max:50',
        ];
    }
}
