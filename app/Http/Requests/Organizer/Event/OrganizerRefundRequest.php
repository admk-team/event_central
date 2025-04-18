<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'requested_amount' => 'required',
            'organizer_remarks' => 'required_if:action,rejected|max:255',
            // 'refund_approved_amount' => 'required_if:action,approved|lte:requested_amount',
            'refund_approved_amount' => [
                Rule::when(
                    $this->input('action') === 'approved',
                    ['required', 'lte:requested_amount'],
                    ['nullable']
                )
            ],
            'action' => 'required',
        ];
    }

    // 'discount' => $this->type === 'promo'
    //     ? ['required', 'lte:100']
    //     : ['nullable'],

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'requested_amount.required' => 'Requested amount is required',
            'refund_id.required' => 'Payment ID is required',
            'organizer_remarks.max:255' => 'Organizer remarks maximum 255 characters are allowed',
            'action.required' => 'Refund action is required',
        ];
    }
}
