<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeePurchasedTickets extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_payment_id',
        'event_app_ticket_id',
        'qty',
        'discount_code',
        'price',
        'discount',
        'subTotal',
        'total'
    ];

    public function payment()
    {
        return $this->belongsTo(AttendeePayment::class, 'attendee_payment_id');
    }

    public function ticket()
    {
        return $this->belongsTo(EventAppTicket::class, 'event_app_ticket_id');
    }

    public function purchased_addons()
    {
        return $this->belongsToMany(Addon::class, 'addon_purchased_ticket', 'attendee_purchased_ticket_id');
    }
}
