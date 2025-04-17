<?php

namespace App\Http\Requests\Attendee;

use Illuminate\Foundation\Http\FormRequest;

class RefundTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('attendee')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'payment_id' => 'required',
            'refund_type' => 'required|in:all_tickets,held_with_me,transfered',
            'refund_reason' => 'required|max:255',
            'refund_requested_amount' => 'required|numeric',
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
            'payment_id.required' => 'Payment ID is required',
            'refund_type.required' => 'Refund Type is required',
            'refund_reason.required' => 'Brief Reason of refund is required',
            'refund_requested_amount.required' => 'Refund amount is required',
            'refund_requested_amount.numeric' => 'Refund amount must be numeric',
        ];
    }
}
