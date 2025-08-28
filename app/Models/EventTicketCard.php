<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventTicketCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_purchased_ticket_id',
        'name',
        'position',
        'location',
    ];

    public function attendeePurchasedTicket()
    {
        return $this->belongsTo(AttendeePurchasedTickets::class);
    }
}
