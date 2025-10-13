<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\UserResource;
use App\Models\EventSession;
use App\Models\OrganizerPaymentKeys;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $privateRegister = eventSettings($this->id)->getValue('private_register', false);
        $closeOpenRegistration = eventSettings($this->id)->getValue('close_registration', false);
        $paymentDetail = OrganizerPaymentKeys::where('user_id',$this->organizer_id)->first();
        $cuurency_code =  $paymentDetail->currency ?? 'USD';
        $currency_symbol =  $paymentDetail->currency_symbol ?? '$';
        return [
            'id' => $this->id,
            'organizer_id' => $this->organizer_id,
            'name' => $this->name,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'location_type' => $this->location_type,
            'location_base' => $this->location_base,
            'type' => $this->type,
            'schedual_type' => $this->schedual_type,
            'event_sessions' => EventSessionResource::collection($this->whenLoaded('event_sessions')),
            'event_organizer' => new UserResource($this->whenLoaded('organiser')),
            'public_tickets' => PublicTicketResource::collection($this->whenLoaded('public_tickets')),
            'images' => EventImageResource::collection($this->whenLoaded('images')),
            'dates' => EventDateResource::collection($this->whenLoaded('dates')),
            'featured_image' => $this->featured_image,
            'logo_img' => $this->logo_img,
            'private_register' => $privateRegister ?? false,
            'close_open_registration' => $closeOpenRegistration ?? false,
            'curency_code' => $cuurency_code,
            'currency_symbol' => $currency_symbol
            // 'applicant_answer' => AnswerResource::collection($this->whenLoaded('applicantAnswer')),
        ];
    }
}
