<?php

namespace App\Console\Commands;

use App\Jobs\EventSessionReminder;
use App\Models\AttendeeFavSession;
use App\Models\EventAppTicket;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SessionReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:event-session-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'event session reminder';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $currentDate = Carbon::today();
        $favSessions = AttendeeFavSession::with([
            'attendee',
            'event.dates',
            'session.eventDate',
            'session.eventSpeakers',
            'session.eventPlatform',
        ])
            ->get();

        foreach ($favSessions as $fav) {

            $event = $fav->event;
            $matchingDate = $event->dates->firstWhere('date', $currentDate->toDateString());

            if (!$matchingDate) continue;

            $session = $fav->session;

            if (!$session || $session->event_date_id !== $matchingDate->id) continue;

            $startTime = Carbon::parse($session->start_time);
            $diffInMinutes = $now->diffInMinutes($startTime, false);

            if ($diffInMinutes === 10) {
                EventSessionReminder::dispatch(
                    $fav->attendee,
                    $event,
                    $matchingDate,
                    $session
                );
            }
        }
    }
}
