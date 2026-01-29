<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class PrivateInviteMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $eventApp, $inviteUrl, $startDate, $endDate;

    public function __construct($eventApp, $inviteUrl, $startDate, $endDate)
    {
        $this->eventApp = $eventApp;
        $this->inviteUrl = $inviteUrl;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fromEmail = "info@mail.eventcentral.net";
        $fromName = $this->eventApp->name ?? env('APP_NAME');

        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'You\'re Invited: Register Now for ' . ($this->eventApp->name ?? 'Our Event'),
            replyTo: [new Address(config('mail.reply_to.address'), config('mail.reply_to.name') ?? '')],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.private_registration',
            with: [
                'events' => $this->eventApp,
                'inviteUrl' => $this->inviteUrl,
                'startDate' => $this->startDate,
                'endDate' => $this->endDate,
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
