<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EventTicketPurchasedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $attendee;
    public $attendee_purchased_tickets;
    public $eventApp;

    /**
     * Create a new message instance.
     */
    public function __construct(Attendee $_attendee, $_attendee_purchased_tickets, EventApp $eventApp)
    {
        $this->attendee = $_attendee;
        $this->eventApp = $eventApp;
        $this->attendee_purchased_tickets = $_attendee_purchased_tickets;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Ticket Purchase Confirmation ' . ': ' . env('APP_NAME'),
            replyTo: [new Address(config('mail.reply_to.address'), config('mail.reply_to.name') ?? '')],
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
                'eventApp' => $this->eventApp,
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
