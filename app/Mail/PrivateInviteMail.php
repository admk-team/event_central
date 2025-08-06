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
    public $inviteUrl;
    public $eventapp;
    public function __construct($eventapp, $inviteUrl)
    {
        $this->eventapp = $eventapp;
        $this->inviteUrl = $inviteUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fromEmail = "info@mail.eventcentral.net";
        $fromName = $this->eventapp->name ?? env('APP_NAME');

        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'You\'re Invited: Register Now for ' . ($this->eventapp->name ?? 'Our Event'),
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
                'events' => $this->eventapp,
                'inviteUrl' => $this->inviteUrl,
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
