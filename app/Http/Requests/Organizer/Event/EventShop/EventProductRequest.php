<?php

namespace App\Http\Requests\Organizer\Event\EventShop;

use Illuminate\Foundation\Http\FormRequest;

class EventProductRequest extends FormRequest
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
            'name'         => ['required', 'string', 'max:255'],
            'description'  => ['required', 'string'],
            'sizes'  => ['required'],
            'price'        => ['required', 'numeric', 'min:0'],
            'old_price'    => ['nullable', 'numeric', 'min:0'],
            'stock'        => ['required', 'integer', 'min:0'],
            'image'        => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif'],
        ];
    }
}
