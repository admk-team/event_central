<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventTicketResource extends JsonResource
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
            'price' => $this->price,
            'increment_by' => $this->increment_by,
            'increment_rate' => $this->increment_rate,
            'increment_type' => $this->increment_type,
            'start_increment' => $this->start_increment,
            'end_increment' => $this->end_increment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'selected_sessions' => $this->selected_sessions,
            'all_features' => $this->all_features,
            'promo_codes' => new EventTicketPromoCodeResource($this->whenLoaded('promoCodes'))
        ];
    }
}
