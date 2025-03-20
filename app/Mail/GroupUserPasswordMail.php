<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GroupUserPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $password;
    public $user;
    public $event_id;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $password, $event_id)
    {
        $this->password = $password;
        $this->user = $user;
        $this->event_id = $event_id;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Group User Password Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.passwordTemplate',
            with: [
                'name' => $this->user->first_name,
                'email' => $this->user->email,
                'password' => $this->password,
                'event_id' => $this->event_id,
            ],
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
