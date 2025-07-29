<?php

namespace App\Console;

use App\Jobs\EventSessionReminder;
use App\Mail\EventSessionReminderMail;
use App\Models\AttendeeFavSession;
use App\Models\EventApp;
use App\Models\EventSession;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            $now = Carbon::now();
            $currentDate = Carbon::today();

            Log::info('now date: ' . $now);
            Log::info('current date: ' . $currentDate);

            $favSessions = AttendeeFavSession::with([
                'attendee', 
                'event.dates', 
                'session.eventDate', 
                'session.eventSpeakers', 
                'session.eventPlatform',])
                ->get();

            foreach ($favSessions as $fav) {

                $event = $fav->event;
                $matchingDate = $event->dates->firstWhere('date', $currentDate->toDateString());

                if (!$matchingDate) continue;
                Log::info('Matching date found: ' . $matchingDate->date);

                $session = $fav->session;

                if (!$session || $session->event_date_id !== $matchingDate->id) continue;
                Log::info('Session found: ' . $session->id);

                $startTime = Carbon::parse($session->start_time);
                $diffInMinutes = $now->diffInMinutes($startTime, false);

                if ($diffInMinutes === 10) {
                    Log::info('Sending reminder for session before 10 minutes of starting time: ' . $session->id);
                    EventSessionReminder::dispatch(
                        $fav->attendee->email,
                        $event,
                        $matchingDate,
                        $session
                    );
                }
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
