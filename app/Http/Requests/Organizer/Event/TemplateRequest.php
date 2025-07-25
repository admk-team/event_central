<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class TemplateRequest extends FormRequest
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
        switch ($this->method()) {
            case 'POST': // Store request
                return $this->storeRules();

            case 'PUT':
            case 'PATCH': // Update request
                return $this->updateRules();

            default:
                return [];
        }
    }

    private function storeRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'editor_content' => 'required|json',
            'mail_content' => 'required|string',
            'thumbnail' => 'nullable|mimes:jpg,jpeg,png,webp',
        ];
    }

    private function updateRules(): array
    {
        // dd($this->route('template.name'));
        return [
            'name' => 'required|string|max:255',
            'editor_content' => 'nullable|json',
            'mail_content' => 'nullable|string',
            'thumbnail' => 'nullable|mimes:jpg,jpeg,png,webp',
        ];
    }
}
