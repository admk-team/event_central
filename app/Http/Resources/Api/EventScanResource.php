<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\UserResource;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventScanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'message' => "Ticket is valid",
            'ticket' => [
                'name' => $this->name,
                'description' => $this->description,
                'type' => $this->type,
            ]
        ];
    }
}
