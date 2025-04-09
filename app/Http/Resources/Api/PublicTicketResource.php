<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicTicketResource extends JsonResource
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
            'description' => $this->description,
            'type' => $this->type,
            'base_price' => $this->base_price,
            'increment_by' => $this->increment_by,
            'increment_rate' => $this->increment_rate,
            'increment_type' => $this->increment_type,
            'start_increment' => $this->start_increment,
            'end_increment' => $this->end_increment,
            'show_on_attendee_side' => $this->show_on_attendee_side,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'sessions' => $this->sessions ? EventSessionResource::collection($this->whenLoaded('sessions')) : [],
            'addons' => $this->addons ? AddonResource::collection($this->whenLoaded('addons')) : [],
            'fees' => $this->addons ? TicketFeeResource::collection($this->whenLoaded('fees')) : [],
        ];
    }
}
