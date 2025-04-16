<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class OrganizerRefundRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'refund_id' => 'required',
            'organizer_remarks' => 'required_if:action,rejected|max:255',
            'refund_approved_amount' => 'required_if:action,approved|min:1',
            'action' => 'required',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'refund_id.required' => 'Payment ID is required',
            'organizer_remarks.max:255' => 'Organizer remarks maximum 255 characters are allowed',
            'action.required' => 'Refund action is required',
        ];
    }
}
