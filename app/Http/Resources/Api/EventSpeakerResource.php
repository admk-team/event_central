<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventSpeakerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_app_id' => $this->event_app_id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'company' => $this->company,
            'position' => $this->position,
            'bio' => $this->bio,
            'email' => $this->email,
            'phone' => $this->phone,
            'web' => $this->web,
            'linkedin' => $this->linkedin,
            'facebook' => $this->facebook,
            'twitter' => $this->twitter,
            'instagram' => $this->instagram,
            'country' => $this->country,
            'language' => $this->language,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
