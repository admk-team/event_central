<?php

namespace App\Console\Commands;

use App\Models\EventAppTicket;
use App\Models\ReminderEventEmail;
use Illuminate\Console\Command;

class EventCloserReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:event-closer-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'event closer reminder ';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $eventApps = \App\Models\EventApp::with('dates')->get();

        foreach ($eventApps as $eventApp) {

            $firstDate = optional($eventApp->dates()->orderBy('date', 'asc')->first())->date;

            if (!$firstDate) {
                continue;
            }

            $reminderDays = ReminderEventEmail::where('event_app_id', $eventApp->id)->pluck('days');

            $eventStart = \Carbon\Carbon::parse($firstDate)->startOfDay();
            $now = \Carbon\Carbon::now()->startOfDay();
            $diffDays = $now->diffInDays($eventStart, false);

            $diffDays = $now->diffInDays($eventStart, false);

            if ($diffDays < 0) {
                continue;
            }
            if ($reminderDays->contains($diffDays)) {
                \App\Jobs\SendEventReminderJob::dispatch($eventApp);
            }
        }
    }
}
