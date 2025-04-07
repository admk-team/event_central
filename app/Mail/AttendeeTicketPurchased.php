<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\AttendeePurchasedTickets;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AttendeeTicketPurchased extends Mailable
{
    use Queueable, SerializesModels;

    public $attendee;
    public $attendee_purchased_tickets;

    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $_attendee, AttendeePurchasedTickets $_attendee_purchased_tickets)
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
            subject: 'Ticket Purchase Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.attendeeTicketPurchased',
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
