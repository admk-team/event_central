<?php

namespace App\Mail;

use App\Models\Attendee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Support\Facades\Log;

class AvailableTicketMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $attendee;
    public $ticket;
    public $ticketUrl;
    public $eventApp;
    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $attendee, $ticket, $ticketUrl, $eventApp)
    {

        $this->attendee = $attendee;
        $this->ticket = $ticket;
        $this->ticketUrl = $ticketUrl;
        $this->eventApp = $eventApp;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        Log::info("avalileble ticket event app logo  {$this->eventApp}");
        return new Envelope(
            from: new Address("info@mail.eventcentral.net", $this->eventApp->name ?? env('APP_NAME')),
            subject: 'Available Ticket Mail : ' . ($this->eventApp->name ?? 'Upcoming Event')
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.availableTicket',
            with: [
                'attendee' => $this->attendee,
                'ticket' => $this->ticket,
                'purchaseUrl' => $this->ticketUrl,
                'events' => $this->eventApp

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
