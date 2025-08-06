<?php

namespace App\Console;

use App\Console\Commands\IncreaseTicketPrices;
use App\Jobs\EventSessionReminder;
use App\Mail\EventSessionReminderMail;
use App\Models\AttendeeFavSession;
use App\Models\EventApp;
use App\Models\EventAppDate;
use App\Models\EventAppTicket;
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
        $schedule->command(IncreaseTicketPrices::class)->daily();

        // $schedule->call(function () {
        //     $now = Carbon::now();
        //     $currentDate = Carbon::today();

        //     Log::info('now date: ' . $now);
        //     Log::info('current date: ' . $currentDate);

        //     $favSessions = AttendeeFavSession::with([
        //         'attendee', 
        //         'event.dates', 
        //         'session.eventDate', 
        //         'session.eventSpeakers', 
        //         'session.eventPlatform',])
        //         ->get();

        //     foreach ($favSessions as $fav) {

        //         $event = $fav->event;
        //         $matchingDate = $event->dates->firstWhere('date', $currentDate->toDateString());

        //         if (!$matchingDate) continue;
        //         Log::info('Matching date found: ' . $matchingDate->date);

        //         $session = $fav->session;

        //         if (!$session || $session->event_date_id !== $matchingDate->id) continue;
        //         Log::info('Session found: ' . $session->id);

        //         $startTime = Carbon::parse($session->start_time);
        //         $diffInMinutes = $now->diffInMinutes($startTime, false);

        //         if ($diffInMinutes === 10) {
        //             Log::info('Sending reminder for session before 10 minutes of starting time: ' . $session->id);
        //             EventSessionReminder::dispatch(
        //                 $fav->attendee->email,
        //                 $event,
        //                 $matchingDate,
        //                 $session
        //             );
        //         }
        //     }
        // })->everyMinute();

        $schedule->call(function () {

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

                    $closeRegistration = eventSettings($eventAppId)->getValue('close_registration', false);
                    eventSettings($eventAppId)->set('close_registration', !$closeRegistration);

                    Log::info("Event ID {$eventAppId} has passed its last date: {$latestEventDate->date}");
                    
                } else if ($allTicketsFull) {

                    $closeRegistration = eventSettings($eventAppId)->getValue('close_registration', false);
                    eventSettings($eventAppId)->set('close_registration', !$closeRegistration);

                    Log::info("All tickets for Event ID {$eventAppId} are sold out.");
                }
            }
        })->daily();
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
