<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
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
            'title' => 'required',
            'slug' => [
                'required',
                Rule::unique('pages')->ignore($this->page->id),
            ],
            'default_header' => 'boolean',
            'header_id' => 'nullable',
            'default_footer' => 'boolean',
            'footer_id' => 'nullable',
        ];
    }
}
