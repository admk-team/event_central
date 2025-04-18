<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\EventResource;
use App\Http\Resources\Api\EventScanResource;
use App\Models\AttendeePurchasedTickets;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_events')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $events = EventApp::ofOwner()
            ->with('images')
            ->whereCanBeAccessedBy($request->user())
            ->get();

        return $this->successResponse(EventResource::collection($events));
    }

    public function show(EventApp $event)
    {
        if (! Auth::user()->can('view_events', $event)) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $event->load(['images']);

        return $this->successResponse(new EventResource($event));
    }

    public function scan(Request $request, EventApp $event)
    {
        if (! Auth::user()->can('scan_events', $event)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $request->validate([
            'code' => 'required',
        ]);

        $purchasedTicket = AttendeePurchasedTickets::where('code', $request->code)->first();

        if (! $purchasedTicket) {
            return response()->json([
                'status' => 0,
            ]);
        }

        $ticketEvent = $purchasedTicket->ticket?->event;

        if (! $ticketEvent) {
            return response()->json([
                'status' => 0,
            ]);
        }

        if ($ticketEvent->id !== $event->id) {
            return response()->json([
                'status' => 0,
            ]);
        }

        $ticket = $purchasedTicket->ticket;
        $attendee = $purchasedTicket->payment->attendee;

        // Check if attendee has already checked in
        $checkin = $event->attendances()->where('attendee_id', $attendee->id)->latest()->first();

        if ($checkin) {
            return response()->json([
                'status' => 2,
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
                'checkin' => $checkin,
            ]);
        }

        $checkin = $event->attendances()->create([
            'attendee_id' => $attendee->id,
            'checked_in' => now(),
            'qr_code' => $purchasedTicket->qr_code,
        ]);

        return response()->json([
            'status' => 1,
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
            'checkin' => $checkin,
        ]);
    }

    public function checkin(Request $request, EventApp $event)
    {
        if (! Auth::user()->can('scan_events', $event)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $request->validate([
            'attendee_id' => 'required',
            'code' => 'required',
        ]);

        $purchasedTicket = AttendeePurchasedTickets::where('code', $request->code)->first();
        
        $lastCheckin = $event->attendances()->where('attendee_id', $request->attendee_id)->latest()->first();

        if ($lastCheckin && $lastCheckin->checked_out === null) {
            return $this->errorResponse("Attendee has already checked in", 422);
        }

        $checkin = $event->attendances()->create([
            'attendee_id' => $request->attendee_id,
            'checked_in' => now(),
            'qr_code' => $purchasedTicket->qr_code,
        ]);

        if (! $checkin) {
            return $this->errorResponse("Failed to check in", 500);
        }

        return $this->successMessageResponse("Checkin successfull", 200);
    }

    public function checkout(Request $request, EventApp $event)
    {
        $request->validate([
            'attendee_id' => 'required',
        ]);

        if (! Auth::user()->can('scan_events', $event)) {
            return $this->errorResponse("You don't have permission to scan", 403);
        }

        $lastCheckin = $event->attendances()->where('attendee_id', $request->attendee_id)->latest()->first();

        if (!$lastCheckin || $lastCheckin->checked_out !== null) {
            return $this->errorResponse("Attendee has not checked in", 422);
        }

        $lastCheckin->checked_out = now();
        $lastCheckin->save();

        return $this->successMessageResponse("Checkout successfull", 200);
    }
}
