<?php

namespace App\Mail;

use App\Models\Attendee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AvailableTicketMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $attendee;
    public $ticket;
    public $ticketUrl;
    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $attendee, $ticket, $ticketUrl)
    {

        $this->attendee = $attendee;
        $this->ticket = $ticket;
        $this->ticketUrl = $ticketUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Available Ticket Mail',
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
                'purchaseUrl' => $this->ticketUrl

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
