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
            'event_id' => 'required|exists:event_apps,id',
            'title' => 'required|string|max:255',
            'bg_color' => 'required|string|max:255', // Hex Color
            'header_bg_color' => 'required|string|max:255',
            'nav_bg_color' => 'required|string|max:255',
            'card_bg_color' => 'required|string|max:255',
            'primary_color' => 'required|string|max:255',
            'secondary_color' => 'required|string|max:255',
            'footer_color' => 'required|string|max:255',
        ];
    }
}
