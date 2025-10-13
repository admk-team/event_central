<?php

namespace App\Console\Commands;

use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventAppTicket;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class EventCloseRegistration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:event-close-registration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'close event registration';

    public function handle()
    {
        $eventAppIds = EventApp::pluck('id');
        foreach ($eventAppIds as $eventAppId) {
            // Get the latest event date
            $latestEventDate = EventAppDate::where('event_app_id', $eventAppId)
                ->latest('date')
                ->first();
            // Check if all limited tickets are sold
            $tickets = EventAppTicket::where('event_app_id', $eventAppId)->get();

            $limitedTickets = $tickets->filter(function ($ticket) {
                return !is_null($ticket->qty_total);
            });

            $allTicketsFull = $limitedTickets->isNotEmpty() && $limitedTickets->every(function ($ticket) {
                return $ticket->qty_sold >= $ticket->qty_total;
            });
            // Close registration if event has ended or tickets sold out
            if (
                ($latestEventDate && Carbon::parse($latestEventDate->date)->lessThanOrEqualTo(Carbon::today())) ||
                $allTicketsFull
            ) {
                eventSettings($eventAppId)->set('close_registration', true);
            }
        }
    }
}
