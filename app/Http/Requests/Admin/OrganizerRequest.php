<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class OrganizerRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string',
        ];

        if ($this->route()->getName() === 'admin.organizers.store') {
            $rules['email'] = 'required|email|unique:users,email,NULL,deleted_at';
            $rules['password'] = 'required|min:8';
        } else {
            $rules['email'] = 'required|email|unique:users,email,' . $this->organizer->id . '';
            $rules['password'] = 'nullable|min:8';
        }

        return $rules;
    }
}