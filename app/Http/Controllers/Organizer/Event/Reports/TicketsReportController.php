<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Http\Controllers\Controller;
use App\Models\EventAppTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketsReportController extends Controller
{
    public function index()
    {
        $tickets = $this->datatable(EventAppTicket::currentEvent()->with(['promoCodes','sold_tickets']));
        // dd($tickets->toArray());
        return Inertia::render('Organizer/Events/Reports/TicketReport/Index', compact(
            'tickets',
        ));
    }
}
