<?php

namespace App\Http\Controllers\Organizer\Event\Reports;

use App\Helpers\CsvExporter;
use App\Http\Controllers\Controller;
use App\Models\EventAppTicket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketsReportController extends Controller
{
    public function index()
    {
        if (! Auth::user()->can('view_ticket_report')) {
            abort(403);
        }
        $tickets = $this->datatable(EventAppTicket::currentEvent()->with(['promoCodes', 'sold_tickets']));
        // dd($tickets->toArray());
        return Inertia::render('Organizer/Events/Reports/TicketReport/Index', compact(
            'tickets',
        ));
    }

    public function exportTicketData()
    {
        $tickets = EventAppTicket::currentEvent()
            ->with([
                'promoCodes',
                'sold_tickets',
                'sessions',
                'addons'
            ])
            ->get()
            ->map(function ($ticket) {
                return [
                    $ticket->id,
                    $ticket->name,
                    $ticket->base_price ?? 0,
                    $ticket->selected_sessions->count() ?? 0,
                    $ticket->selected_addons->count() ?? 0,
                    $ticket->promoCodes->count() ?? 0,
                    $ticket->sold_tickets->count() ?? 0,
                    $ticket->total_revenue ?? 0,
                ];
            })->toArray();

        return CsvExporter::export('ticket_report.csv', [
            [
                'columns' => [
                    'ID',
                    'Name',
                    'Base Price',
                    'Selected Sessions',
                    'Selected Addons',
                    'Promo Codes',
                    'Sold Tickets',
                    'Total Revenue',
                ],
                'rows' => $tickets,
            ]
        ]);
    }
}
