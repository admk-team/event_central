<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\EventSessionResource;
use App\Models\AttendeePurchasedTickets;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\SessionCheckIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventSessionController extends Controller
{
    public function index(Request $request, EventApp $event)
    {
        if (! Auth::user()->can('view_events', $event)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $sessions = EventSession::where('event_app_id', $event->id)
            ->whereCanBeAccessedBy($request->user())
            ->with(['eventPlatform', 'eventDate'])
            ->get();
        
        return $this->successResponse(EventSessionResource::collection($sessions));
    }

    public function show(EventApp $event, EventSession $session)
    {
        if (!Auth::user()->can('view_events', $event) || !Auth::user()->can('view_event_sessions', $session)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $session->load(['eventPlatform', 'eventDate']);

        return $this->successResponse(new EventSessionResource($session));
    }

    public function scan(Request $request, EventApp $event, EventSession $session)
    {
        if (! Auth::user()->can('scan_event_sessions', $session)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $request->validate([
            'code' => 'required',
        ]);

        $purchasedTicket = AttendeePurchasedTickets::where('code', $request->code)->first();

        if (! $purchasedTicket) {
            return $this->errorResponse("Invalid ticket", 404);
        }

        $ticketEvent = $purchasedTicket->ticket?->event;

        if (! $ticketEvent) {
            return $this->errorResponse("Invalid ticket", 404);
        }

        if ($ticketEvent->id !== $event->id) {
            return $this->errorResponse("Invalid ticket", 404);
        }

        $ticket = $purchasedTicket->ticket;
        $attendee = $purchasedTicket->payment->attendee;

        if (! $ticket->sessions()->where('id', $session->id)->exists()) {
            return $this->errorResponse("Invalid ticket", 404);
        }

        // Check if attendee has already checked in
        $isCheckedin = false;
        $lastCheckin = $session->attendances()->where('attendee_id', $attendee->id)->latest()->first();
        if ($lastCheckin && $lastCheckin->checked_out === null) {
            $isCheckedin = true;
        }

        return $this->successResponse([
            'message' => "Ticket is valid",
            'attendee' => [
                'id' => $attendee->id,
                'first_name' => $attendee->first_name,
                'last_name' => $attendee->last_name,
                'email' => $attendee->email,
                'company' => $attendee->company,
                'position' => $attendee->position,
                'phone' => $attendee->phone,
            ],
            'ticket' => [
                'name' => $ticket->name,
                'description' => $ticket->description,
                'type' => $ticket->type,
            ],
            'is_checked_in' => $isCheckedin,
            'last_check_in' => $lastCheckin,
        ]);
    }

    public function checkin(Request $request, EventApp $event, EventSession $session)
    {
        if (! Auth::user()->can('scan_event_sessions', $session)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $request->validate([
            'attendee_id' => 'required',
            'code' => 'required',
        ]);

        $purchasedTicket = AttendeePurchasedTickets::where('code', $request->code)->first();
        
        $lastCheckin = $session->attendances()->where('attendee_id', $request->attendee_id)->latest()->first();

        if ($lastCheckin && $lastCheckin->checked_out === null) {
            return $this->errorResponse("Attendee has already checked in", 422);
        }

        $checkin = $session->attendances()->create([
            'attendee_id' => $request->attendee_id,
            'checked_in' => now(),
            'event_app_id' => $event->id,
            'qr_code' => $purchasedTicket->qr_code,
        ]);

        if (! $checkin) {
            return $this->errorResponse("Failed to check in", 500);
        }

        return $this->successMessageResponse("Checkin successfull", 200);
    }

    public function checkout(Request $request, EventApp $event, EventSession $session)
    {
        $request->validate([
            'attendee_id' => 'required',
        ]);

        if (! Auth::user()->can('scan_event_sessions', $session)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $lastCheckin = $session->attendances()->where('attendee_id', $request->attendee_id)->latest()->first();

        if (!$lastCheckin || $lastCheckin->checked_out !== null) {
            return $this->errorResponse("Attendee has not checked in", 422);
        }

        $lastCheckin->checked_out = now();
        $lastCheckin->save();

        return $this->successMessageResponse("Checkout successfull", 200);
    }
}
