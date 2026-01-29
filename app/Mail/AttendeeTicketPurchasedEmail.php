<?php

namespace App\Mail;

use App\Models\Attendee;
use App\Models\AttendeePayment;
use App\Models\AttendeePurchasedTickets;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AttendeeTicketPurchasedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $attendee;
    public $attendee_purchased_tickets;
    public $payment;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\AttendeePayment|null  $payment  When provided (e.g. resend or single payment), used for confirmation_number in the email.
     */
    public function __construct(Attendee $_attendee, $_attendee_purchased_tickets, ?AttendeePayment $payment = null)
    {
        $this->attendee = $_attendee;
        $this->attendee_purchased_tickets = $_attendee_purchased_tickets;
        $this->payment = $payment ?? $_attendee_purchased_tickets->first()?->payment;
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
            view: 'emails.attendeeTicketPurchased',
            with: [
                'attendee' => $this->attendee,
                'purchased_tickets' => $this->attendee_purchased_tickets,
                'payment' => $this->payment,
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
