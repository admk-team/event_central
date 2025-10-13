<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;

class SendAfterEventEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $attendee;
    public $eventApp;
    public $endDate;

    public function __construct(Attendee $attendee, EventApp $eventApp, $endDate)
    {
        $this->attendee = $attendee;
        $this->eventApp = $eventApp;
        $this->endDate  = $endDate;
    }

    public function envelope(): envelope
    {
        return new Envelope(
            from: new Address("info@mail.eventcentral.net", $this->eventApp->name ?? env('APP_NAME')),
            subject: 'Event Follow Up: ' . ($this->eventApp->name ?? 'Upcoming Event')
        );
    }
    public function content(): Content
    {
        return new Content(
            view: 'emails.after_event_reminder',
            with: [
                'events' => $this->eventApp,
                'attendee' => $this->attendee,
                'endDate' => $this->endDate,
            ]
        );
    }
    public function attachments(): array
    {
        return [];
    }
}
