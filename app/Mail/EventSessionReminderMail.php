<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class EventSessionReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $events;
    public $date;
    public $session;

    public function __construct($events, $date, $session)
    {
        $this->events = $events;
        $this->date = $date;
        $this->session = $session;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        $fromEmail =  "info@mail.eventcentral.net";
        $fromName = $this->events->name ?? env('APP_NAME');
        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'Event Session Reminder',
            replyTo: [new Address(config('mail.reply_to.address'), config('mail.reply_to.name') ?? '')],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.event-session-reminder',
            with: [
                'events' => $this->events,
                'date' => $this->date,
                'session' => $this->session,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
