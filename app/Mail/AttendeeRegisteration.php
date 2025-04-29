<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class AttendeeRegisteration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $fname,$lname,$password,$email,$event_app,$url;
    public function __construct($fname,$lname,$password,$email,$event_app,$url)
    {
        $this->fname = $fname;
        $this->lname = $lname;
        $this->password = $password;
        $this->email = $email;
        $this->event_app = $event_app;
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fromEmail =  env('MAIL_FROM_ADDRESS');
        $fromName = $this->event_app->name ?? env('APP_NAME');
        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'Attendee Account Credentials',
        );
    }


    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.attendeeRegisteration',
            with: [
                'fname' => $this->fname,
                'lname' => $this->lname,
                'password' => $this->password,
                'email' => $this->email,
                'event_app' => $this->event_app,
                'url' => $this->url
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
