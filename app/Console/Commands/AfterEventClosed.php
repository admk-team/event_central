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
        $eventApps = EventApp::with('dates')->get();
        foreach ($eventApps as $eventApp) {

            $lastDate = optional($eventApp->dates()->orderBy('date', 'desc')->first())->date;
            if (!$lastDate) {
                continue;
            }

            $afterReminderDays = (int) eventSettings($eventApp->id)->getValue('after_days', 3);

            $eventEnd = Carbon::parse($lastDate)->endOfDay();
            $now = Carbon::now()->startOfDay();
            $diffDays = $eventEnd->diffInDays($now, false);
            if ($diffDays < 0) {
                continue;
            }

            // $enable = EventAppSetting::where('event_app_id', $eventApp->id)->where('key', "follow_up_event")->first();
            $enable_follow_up = eventSettings($eventApp->id)->getValue('follow_up_event', false);
            if ($diffDays == $afterReminderDays && $enable_follow_up) {
                \App\Jobs\SendAfterEventJob::dispatch($eventApp);
            }
        }
    }
}
