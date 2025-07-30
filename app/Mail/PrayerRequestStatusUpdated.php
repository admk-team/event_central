<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class PrayerRequestStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $prayerRequest;

    public function __construct($prayerRequest)
    {
        $this->prayerRequest = $prayerRequest;
    }

    public function envelope(): Envelope
    {
        $fromEmail = 'info@mail.eventcentral.net';
        $fromName = $this->prayerRequest->eventApp->name ?? config('app.name');

        return new Envelope(
            from: new Address($fromEmail, $fromName),
            subject: 'Your Prayer Request Status Update',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.prayer_request_status_updated',
        );
    }
}
