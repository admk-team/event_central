<?php

namespace App\Http\Requests\Organizer\Event;

use App\Enums\EventAppFeeType;
use App\Models\EventApp;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class EventAppFeeRequest extends FormRequest
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
            'user_id' => 'required|numeric',
            'event_app_id' => 'required|numeric',
            'name' => 'required|max:150',
            'status' => 'required',
            'fee_amount' => 'required',
            'fee_type' => ['required', new Enum(EventAppFeeType::class)],
            'description' => ''
        ];
    }


    public function messages()
    {
        return [
            'name.required' => 'Name is Required',
            'status.required' => 'Status is Required',
            'fee_amount.required' => 'Fee amount is required.',
            'user_id.required' => 'User Id is required.',
            'fee_type.required' => 'Fee type is required.',
            'fee_type.enum' => 'Fee type must be one of the following: flat, percentage.',
        ];
    }
}
