<?php

namespace App\Http\Resources\Api;

use App\Models\SessionCheckIn;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class EventSessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = Auth::user();
        $checkin = false;

        if ($user) {
            $checkin = SessionCheckIn::where('attendee_id', $user->id)
                ->where('session_id', $this->id)
                ->exists();
        }

        $download_certificate = false;
        if (!now()->lt(\Carbon\Carbon::parse($this->end_date_time)) && $checkin) {
            $download_certificate = true;
        }
        return [
            'id' => $this->id,
            'event_app_id' => $this->event_app_id,
            'event_speakers' => EventSpeakerResource::collection($this->whenLoaded('eventSpeakers')),
            'event_platform' => new EventPlatformResource($this->whenLoaded('eventPlatform')),
            'event_date' => new EventDateResource($this->whenLoaded('eventDate')),
            'tracks' => TrackResource::collection($this->whenLoaded('tracks')),
            'event_date_id' => $this->event_date_id,
            'name' => $this->name,
            'type' => $this->type,
            'posts' => $this->posts,
            'qa_status' => $this->qa_status,
            'enable_certificate' => $this->enable_certificate,
            'download_certificate' => $download_certificate,
            'description' => $this->description,
            'capacity' => $this->capacity,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'selected_by_attendee' => $this->selected_by_attendee,
            'is_favourite' => $this->is_favourite,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
