<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeePayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'event_app_id',
        'attendee_id',
        'discount_code',
        'sub_total',
        'discount',
        'amount_paid',
        'stripe_intent',
        'status',
        'payment_method',
    ];

    protected $with = ['purchased_tickets'];

    public function purchased_tickets()
    {
        return $this->hasMany(AttendeePurchasedTickets::class);
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }

    public function refund_tickets()
    {
        return $this->hasOne(AttendeeRefundTicket::class);
    }
}
