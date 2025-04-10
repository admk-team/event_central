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
            return $this->errorResponse("Unauthorized", 403);
        }

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

        return $this->successResponse(new EventScanResource($purchasedTicket->ticket));
    }
}
