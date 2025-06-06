<?php

namespace App\Http\Requests\Organizer;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'role_id' => 'required',
            'accessible_events' => 'nullable|array',
            'accessible_event_sessions' => 'nullable|array',
        ];

        if ($this->route()->getName() === 'organizer.users.store') {
            $rules['email'] = 'required|email|unique:users,email,NULL,deleted_at';
            $rules['password'] = 'required|min:8';
        } else {
            $rules['email'] = 'required|email|unique:users,email,' . $this->user->id . '';
            $rules['password'] = 'nullable|min:8';
        }

        return $rules;
    }
}