<?php

namespace App\Http\Requests\Attendee;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
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
     * 'nullable|url:http,https|active_url|regex:/http(?:s):\/\/(?:www\.)facebook\.com\/.+/i',
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:150',
            'last_name' => 'required|string|max:150',
            'company' => 'nullable|max:100',
            'position' => 'nullable|max:100',
            'other_link' => 'nullable|url:http,https|active_url',
            'facebook_link' => 'nullable|url:http,https|active_url',
            'linkedin_link' => 'nullable|url:http,https|active_url',
            'twitter_link' => 'nullable|url:http,https|active_url',
            'country' => 'nullable|max:100',
            'phone' => 'nullable|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'bio' => 'nullable|max:250',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'first_name.max' => 'Max 150 characters',
            'last_name.max' => 'Max 150 characters',
            'company.max' => 'Max 100 characters',
            'position.max' => 'Max 100 characters',
            'other_link.url' => 'Must be valid url',
            'other_link.active_url' => 'Must be active valid url',
            'facebook_link.active_url' => 'Must be valid url',
            'linkedin_link.active_url' => 'Must be valid url',
            'twitter_link.active' => 'Must be valid url',
            'country.max' => 'Max 100 characters',
            'phone.regex' => 'Must be valid phone number',
            'bio.max' => 'Max 250 characters',
        ];
    }
}
