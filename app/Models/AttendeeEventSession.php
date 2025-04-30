<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeEventSession extends Model
{
    use HasFactory;

    protected $table = 'attendee_event_session';
    // protected $primaryKey = ['attendee_id', 'event_session_id','attendee_purchased_ticket_id','attendee_payment_id'];
    protected $fillable = [
        'attendee_id',
        'event_session_id',
        'attendee_purchased_ticket_id',
        'attendee_payment_id',
        'rating',
        'rating_description'
    ];
}
