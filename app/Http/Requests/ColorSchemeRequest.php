<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ColorSchemeRequest extends FormRequest
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
            'event_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'bg_color' => 'required|string|max:7', // Hex Color
            'header_bg_color' => 'required|string|max:7',
            'nav_bg_color' => 'required|string|max:7',
            'card_bg_color' => 'required|string|max:7',
            'primary_color' => 'required|string|max:7',
            'secondary_color' => 'required|string|max:7',
            'footer_color' => 'required|string|max:7',
        ];
    }
}
