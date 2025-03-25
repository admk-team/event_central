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
        'discountCode',
        'price',
        'discount',
        'subTotal',
        'total'
    ];
}
