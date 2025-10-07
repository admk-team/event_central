<?php

namespace App\Console\Commands;

use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventAppTicket;
use Carbon\Carbon;
use Illuminate\Console\Command;

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

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $eventAppIds = EventApp::pluck('id');

        foreach ($eventAppIds as $eventAppId) {
            $latestEventDate = EventAppDate::where('event_app_id', $eventAppId)
                ->latest('date')
                ->first();

            $eventFull = EventAppTicket::where('event_app_id', $eventAppId)->get();

            $allTicketsFull = $eventFull->every(function ($ticket) {
                return $ticket->qty_sold >= $ticket->qty_total;
            });

            if ($latestEventDate && Carbon::parse($latestEventDate->date)->lessThan(Carbon::today())) {
                $closeRegistration = eventSettings($eventAppId)->set('close_registration', true);
            } elseif ($allTicketsFull) {
                $closeRegistration = eventSettings($eventAppId)->set('close_registration', true);
            }
        }
    }
}
