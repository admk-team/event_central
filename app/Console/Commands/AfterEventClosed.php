<?php

namespace App\Console\Commands;

use App\Models\EventApp;
use App\Models\EventAppSetting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class AfterEventClosed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:after-event-closed';

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
        Log::info('Event After Reminder Scheduler Started');

        $eventApps = EventApp::with('dates')->get();
        Log::info('Fetched EventApps: ' . $eventApps->count());
        foreach ($eventApps as $eventApp) {
            Log::info("Checking EventApp ID: {$eventApp->id}");

            $lastDate = optional($eventApp->dates()->orderBy('date', 'desc')->first())->date;

            if (!$lastDate) {
                Log::warning("EventApp ID {$eventApp->id} has no end date.");
                continue;
            }

            $afterReminderDays = (int) eventSettings($eventApp->id)->getValue('after_days', 3);
            Log::info("After Reminder days for EventApp ID {$eventApp->id}: {$afterReminderDays}");

            $eventEnd = Carbon::parse($lastDate)->endOfDay();
            $now = Carbon::now()->startOfDay();
            $diffDays = $eventEnd->diffInDays($now, false);

            Log::info("Event End: {$eventEnd->toDateString()}, Today: {$now->toDateString()}, Diff: {$diffDays} days");

            if ($diffDays < 0) {
                Log::info("EventApp ID {$eventApp->id} has not ended yet. Skipping...");
                continue;
            }

            // $enable = EventAppSetting::where('event_app_id', $eventApp->id)->where('key', "follow_up_event")->first();
            $enable_follow_up = eventSettings($eventApp->id)->getValue('follow_up_event', false);
            Log::info("-----------: {$enable_follow_up}");
            if ($diffDays == $afterReminderDays && $enable_follow_up) {
                Log::info("EventApp ID {$eventApp->id} ended {$diffDays} days ago, sending after-event reminder.....................................................");
                \App\Jobs\SendAfterEventJob::dispatch($eventApp);
            }
        }

        Log::info('Event After Reminder Scheduler Completed');
    }
}
