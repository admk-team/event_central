<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\TicketResource;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index(EventApp $event)
    {
        if (! Auth::user()->can('view_tickets')) {
            return $this->errorResponse("Unauthorized", 403);
        }

        $tickets = $event->public_tickets;

        return $this->successResponse(TicketResource::collection($tickets));
    }
}
