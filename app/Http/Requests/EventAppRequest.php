<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventAppRequest extends FormRequest
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
            'organizer_id' => 'required|exists:users,id',
            'regis_page_id' => 'required|exists:registration_pages,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'location_type' => 'required|string|max:255',
            'location_base' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'schedual_type' => 'required|in:singleday,multiday,recurring',
        ];
    }
}
