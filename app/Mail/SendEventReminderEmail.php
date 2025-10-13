<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class SendEventReminderEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $eventApp, $attendee, $startDate, $endDate;

    public function __construct($attendee, $eventApp, $startDate, $endDate)
    {
        $this->eventApp = $eventApp;
        $this->attendee = $attendee;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address("info@mail.eventcentral.net", $this->eventApp->name ?? env('APP_NAME')),
            subject: 'Event Reminder: ' . ($this->eventApp->name ?? 'Upcoming Event')
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.event_reminder_start',
            with: [
                'events' => $this->eventApp,
                'attendee' => $this->attendee,
                'startDate' => $this->startDate,
                'endDate' => $this->endDate,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
