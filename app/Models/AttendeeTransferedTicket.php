<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeTransferedTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'email',
        'payment_method',
        'stripe_intent',
        'attendee_purchased_ticket_id',
        'event_app_ticket_id',

        'bt_attendee_payment_id',
        'at_attendee_payment_id', //at_attendee_payment_id

        'bt_attendee_id',
        'at_attendee_id',

        'transfer_status',
    ];
}
