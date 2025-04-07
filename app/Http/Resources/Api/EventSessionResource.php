<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventSessionResource extends JsonResource
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
            'event_speakers' => EventSpeakerResource::collection($this->whenLoaded('eventSpeakers')),
            'event_platform' => new EventPlatformResource($this->whenLoaded('eventPlatform')),
            'event_date_id' => $this->event_date_id,
            'name' => $this->name,
            'type' => $this->type,
            'description' => $this->description,
            'capacity' => $this->capacity,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
