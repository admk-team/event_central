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
            'base_price' => $this->base_price,
            'increment_by' => $this->increment_by,
            'increment_rate' => $this->increment_rate,
            'increment_type' => $this->increment_type,
            'start_increment' => $this->start_increment,
            'end_increment' => $this->end_increment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'selected_sessions' => $this->selected_sessions,
            'addons' => new EventTicketPromoCodeResource($this->whenLoaded('promoCodes')),
            'promo_codes' => new EventTicketPromoCodeResource($this->whenLoaded('promoCodes')),
            'fees' => new TicketFeeResource($this->whenLoaded('fees')),
            'extra_services' => $this->extra_services,
            'extra_service_name' => $this->extra_service_name,
            'bulk_purchase_status' => $this->bulk_purchase_status,
            'bulk_purchase_discount_type' => $this->bulk_purchase_discount_type,
            'bulk_purchase_discount_value' => $this->bulk_purchase_discount_value,
            'bulk_purchase_qty' => $this->bulk_purchase_qty
        ];
    }
}
