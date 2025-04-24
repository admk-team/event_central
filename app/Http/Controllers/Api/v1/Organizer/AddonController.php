<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\AttendeePurchasedTickets;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddonController extends Controller
{
    public function index(Request $request, EventApp $event)
    {
        $query = Addon::where('event_app_id', $event->id)->withCount('checkins');
        
        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%")
                ->limit(20);
        } else {
            $query->orderBy('name');
        }

        $addons = $query->get();

        return $addons;
    }

    public function scan(Request $request, EventApp $event, Addon $addon)
    {
        if (! Auth::user()->can('scan_addons')) {
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

        $addonPurchased = $purchasedTicket->purchased_addons()->where('id', $addon->id)->exists();

        if (! $addonPurchased) {
            return response()->json([
                'status' => 0,
            ]);
        }

        $ticket = $purchasedTicket->ticket;
        $attendee = $purchasedTicket->payment->attendee;

        // Check if attendee has already checked in
        $checkin = $addon->checkins()->where('attendee_id', $attendee->id)->latest()->first();

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

        $checkin = $addon->checkins()->create([
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
}
