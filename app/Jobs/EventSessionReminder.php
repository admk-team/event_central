<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventSessionReminderMail;

class EventSessionReminder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * The recipient of the reminder email.
     *
     * @var string
     */
    public $events;
    public $date;
    public $session;
    public $email;

    public function __construct($email, $events, $date, $session)
    {
        $this->email = $email;
        $this->events = $events;
        $this->date = $date;
        $this->session = $session;
    }

    public function handle(): void
    {
        Mail::to($this->email)->send(
            new EventSessionReminderMail($this->events, $this->date, $this->session)
        );
    }
}