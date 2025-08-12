<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventSessionReminderMail;
use App\Traits\SendsWebPushNotifications;

class EventSessionReminder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, SendsWebPushNotifications;
    /**
     * The recipient of the reminder email.
     *
     * @var string
     */
    public $events;
    public $date;
    public $session;
    public $attendee;

    public function __construct($attendee, $events, $date, $session)
    {
        $this->attendee = $attendee;
        $this->events = $events;
        $this->date = $date;
        $this->session = $session;
    }

    public function handle(): void
    {
        Mail::to($this->attendee->email)->send(
            new EventSessionReminderMail($this->events, $this->date, $this->session)
        );
        $this->sendWebPushNotification(
            $this->attendee->id,
            'Session Reminder',
            "{$this->session->name} will start in 10 minutes",
            route('attendee.event.detail.session', $this->session->id)
        );
    }
}
