<?php

namespace App\Http\Requests\Attendee;

use Illuminate\Foundation\Http\FormRequest;

class UpgradeTicketRequest extends FormRequest
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
            'attendee_id' => 'required',
            'attendee_purchased_ticket_id' => 'required',
            'upgradedSessionIds' => 'array|min:1',
            'stripe_payment_intent' => 'nullable|string',
            'stripe_payment_id' => 'nullable|string',
            'payment_method' => 'string|in:stripe,cash,free,other',
            'stripe_payment_id' => 'string|nullable',
            'organizer_payment_note' => 'string|nullable|max:255',
        ];
    }
}
