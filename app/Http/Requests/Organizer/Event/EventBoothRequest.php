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
            'type'        => 'required|string|in:booth,sponsor ad,banner',
            'description' => 'nullable|string',
            'number'      => 'nullable|integer|min:0',
            'price'       => 'required|integer|min:0',
            'total_qty'   => 'required|integer|min:1',
            // we still accept sold_qty for manual seed/import, but usually we compute it
            'sold_qty'    => 'nullable|integer|min:0|lte:total_qty',
            'logo'        => ['sometimes', 'nullable', File::image()],
            // NEW: multi-assign
            'attendee_ids'   => 'nullable|array',
            'attendee_ids.*' => 'integer|exists:attendees,id',
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
