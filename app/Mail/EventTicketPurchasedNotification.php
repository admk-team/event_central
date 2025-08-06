<?php

namespace App\Mail;

use App\Models\Attendee;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class EventTicketPurchasedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $attendee;
    public $attendee_purchased_tickets;

    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $_attendee, $_attendee_purchased_tickets)
    {
        $this->attendee = $_attendee;
        $this->attendee_purchased_tickets = $_attendee_purchased_tickets;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Ticket Purchase Confirmation ' . ': ' . env('APP_NAME'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.organizerTicketPurchased',
            with: [
                'attendee' => $this->attendee,
                'purchased_tickets' => $this->attendee_purchased_tickets,
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
