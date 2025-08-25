<?php

namespace App\Http\Requests\Attendee;

use Illuminate\Foundation\Http\FormRequest;

class AttendeeCheckoutRequest extends FormRequest
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
            'discount' => 'required|numeric',
            'discount_code' => 'nullable',
            'subTotal' => 'numeric',
            'totalAmount' => 'numeric',
            'organizer_payment_note' => 'nullable',
            'ticketsDetails' => 'array',
            'ticketsDetails.*.addons' => 'array',
            'ticketsDetails.*.addons_sub_total' => 'numeric',
            'ticketsDetails.*.fees_sub_total' => 'numeric',

            'ticketsDetails.*.id' => 'numeric',
            'ticketsDetails.*.ticket_no' => 'numeric',

            'ticketsDetails.*.ticket' => 'required',
            'ticketsDetails.*.ticket.id' => 'required',
            'ticketsDetails.*.ticket.base_price' => 'required',

            'ticketsDetails.*.extra_services'                  => ['nullable', 'array'],
            'ticketsDetails.*.extra_services.*.name'           => ['required', 'string', 'max:255'],
            'ticketsDetails.*.extra_services.*.quantity'       => ['required', 'integer', 'min:1'],

        ];
    }
}
