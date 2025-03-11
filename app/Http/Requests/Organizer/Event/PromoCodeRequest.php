<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;

class PromoCodeRequest extends FormRequest
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
            'event_app_id' => 'required',
            'code' => 'required|max:50',
            'description' => 'required',
            'discount_type' => 'required|in:fixed,percentage',
            'discount_value' => 'required|numeric',
            'usage_limit' => 'sometimes|numeric',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,expired,disabled',
            'tickets' => 'required|array|min:1'
        ];
    }

    /**
     * Get the validation message that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages()
    {
        return [
            'event_app_id.required' => 'Event App Id Is Required',
            'code.required' => 'Code Field Is Required',
            'code.max:50' => 'Code Field Must Be less Than 25 Characters',
            'description.required' => 'Description Field Is Required',
            'discount_type.required' => 'Discount Type Is Required',
            'discount_value.required' => 'Discount Value Is Required',
            'usage_limit.numeric' => 'Usage Limit Must Be Numeric',
            'start_date.required' => 'Start Date Is Required',
            'start_date.before_or_equal' => 'Must Be Before Or Equal To End Date',
            'end_date.required' => 'End Date Is Required',
            'end_date.after_or_equal' => 'Must Be After Or Equal To Start Date',
            'status.required' => 'Status Is Required',
            'tickets.required' => 'Associated Tickets are required',
            'tickets.min:1' => 'At Least one Ticket is Required'
        ];
    }
}
