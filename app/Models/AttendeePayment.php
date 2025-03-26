<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeePayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'attendee_id',
        'amount_paid',
        'payment_method'
    ];

    protected $with = ['purchased_tickets'];

    public function purchased_tickets()
    {
        return $this->hasMany(AttendeePurchasedTickets::class);
    }
}
