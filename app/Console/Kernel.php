<?php

namespace App\Console;

use App\Console\Commands\EventCloseRegistration;
use App\Console\Commands\EventCloserReminder;
use App\Console\Commands\IncreaseTicketPrices;
use App\Console\Commands\SessionReminder;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command(IncreaseTicketPrices::class)->daily();
        $schedule->command(EventCloseRegistration::class)->daily();
        $schedule->command(EventCloserReminder::class)->daily();
        $schedule->command(SessionReminder::class)->everyMinute();
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
