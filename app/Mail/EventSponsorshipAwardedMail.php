<?php
// app/Mail/EventSponsorshipAwardedMail.php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventSponsorshipAwardedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $events;   // EventApp
    public $booth;    // EventBooth
    public $attendee; // Attendee

    public function __construct($events, $booth, $attendee)
    {
        $this->events   = $events;
        $this->booth    = $booth;
        $this->attendee = $attendee;
    }

    public function envelope(): Envelope
    {
        $fromEmail = "info@mail.eventcentral.net";
        $fromName  = $this->events->name ?? env('APP_NAME');

        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'Sponsorship Opportunity Awarded',
            replyTo: [new Address(config('mail.reply_to.address'), config('mail.reply_to.name') ?? '')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.event-sponsorship-awarded',
            with: [
                'events'   => $this->events,
                'booth'    => $this->booth,
                'attendee' => $this->attendee,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
