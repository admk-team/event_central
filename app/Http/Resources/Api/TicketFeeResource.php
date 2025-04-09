<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketFeeResource extends JsonResource
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
            'user_id' => $this->user_id,
            'event_app_id' => $this->event_app_id,
            'name' => $this->name,
            'description' => $this->description,
            'fee_amount' => $this->fee_amount,
            'fee_type' => $this->fee_type,
            'status' => $this->status,
        ];
    }
}
