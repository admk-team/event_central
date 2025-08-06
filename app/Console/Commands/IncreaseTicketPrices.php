<?php

namespace App\Console\Commands;

use App\Models\EventAppTicket;
use Illuminate\Console\Command;

class IncreaseTicketPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:increase-ticket-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tickets = EventAppTicket::whereColumn('qty_total', '>', 'qty_sold')
            ->whereNotNull('increment_rate')
            ->where('start_increment', '<=', now())
            ->where('end_increment', '>=', now())
            ->whereHas('event', function ($query) {
                $query->whereIn('id', function ($subquery) {
                    $subquery->select('event_app_id')
                        ->from('event_app_dates')
                        ->groupBy('event_app_id')
                        ->havingRaw('MAX(date) >= ?', [now()]);
                });
            })
            ->get();

        foreach ($tickets as $ticket) {
            if (! $ticket->increment_rate) continue;

            $incrementAmount = 0;
            if ($ticket->increment_type === 'Percentage') {
                $incrementAmount = ($ticket->increment_rate / 100) * $ticket->original_price;
            } else {
                $incrementAmount = $ticket->increment_rate;
            }

            $ticket->base_price += $incrementAmount;
            $ticket->save();
        }
    }
}
