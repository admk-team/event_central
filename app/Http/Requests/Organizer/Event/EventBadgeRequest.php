<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class EventBadgeRequest extends FormRequest
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
        $rules = [
            'title' => 'required|string|max:255',
            'type' => 'required',
            'points' => 'required|integer|min:0',
            'milestone' => 'required|integer|min:0',
            'description' => 'nullable',
        ];
    
        if ($this->isMethod('post')) { // Only require icon on Create (POST)
            $rules['icon'] = File::image();
        }
    
        return $rules;
    }
    
}
