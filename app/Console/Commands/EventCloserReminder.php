<?php

namespace App\Console\Commands;

use App\Models\EventAppTicket;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

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
        Log::info('Event Reminder Scheduler Started');

        $eventApps = \App\Models\EventApp::with('dates')->get();
        Log::info('Fetched EventApps: ' . $eventApps->count());

        foreach ($eventApps as $eventApp) {
            Log::info("Checking EventApp ID: {$eventApp->id}");

            $firstDate = optional($eventApp->dates()->orderBy('date', 'asc')->first())->date;

            if (!$firstDate) {
                Log::warning("EventApp ID {$eventApp->id} has no start date.");
                continue;
            }

            $reminderDays = (int) eventSettings($eventApp->id)->getValue('reminder_days', 7);
            Log::info("Reminder days for EventApp ID {$eventApp->id}: {$reminderDays}");

            $eventStart = \Carbon\Carbon::parse($firstDate)->startOfDay();
            $now = \Carbon\Carbon::now()->startOfDay();
            $diffDays = $now->diffInDays($eventStart, false);

            $diffDays = $now->diffInDays($eventStart, false);

            Log::info("Today: {$now->toDateString()}, Event Start: {$eventStart->toDateString()}, Diff: {$diffDays} days");

            if ($diffDays < 0) {
                Log::info("EventApp ID {$eventApp->id} already passed. Skipping reminder...");
                continue;
            }
            if ($diffDays <= $reminderDays) {
                Log::info("Event is {$diffDays} days away for EventApp ID {$eventApp->id}, sending reminder...");
                \App\Jobs\SendEventReminderJob::dispatch($eventApp);
            }
        }

        Log::info('Event Reminder Scheduler Completed');
    }
}
