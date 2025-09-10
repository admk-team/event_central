<?php

namespace App\Http\Requests\Organizer\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;
class EventBoothRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'number'      => 'nullable|integer|min:0',

            // Do NOT allow client to set status directly
            'status'      => 'prohibited',

            'price'       => 'nullable|integer|min:0',

            // Adjust table name if your attendees table differs
            'attendee_id' => 'nullable|exists:attendees,id',

            // Optional image when present
            'logo'        => ['sometimes', 'nullable', File::image()],
            'type'        => ['required', Rule::in(['booth','sponsor ad','banner'])],
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['attendee_id', 'number', 'price'] as $key) {
            if ($this->has($key)) {
                $val = $this->input($key);
                if ($val === '') {
                    $this->merge([$key => null]);
                } elseif (is_numeric($val)) {
                    $this->merge([$key => (int) $val]);
                }
            }
        }
    }
}
