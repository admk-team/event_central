<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AttendeePayment extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (AttendeePayment $payment) {
            if (empty($payment->confirmation_number)) {
                do {
                    $payment->confirmation_number = 'EC-' . strtoupper(Str::random(8));
                } while (static::where('confirmation_number', $payment->confirmation_number)->exists());
            }
        });
    }

    protected $fillable = [
        'uuid',
        'confirmation_number',
        'event_app_id',
        'attendee_id',
        'discount_code',
        'sub_total',
        'discount',
        'amount_paid',
        'stripe_intent',
        'status',
        'payment_method',
        'stripe_id',
        'organizer_payment_note',
        'extra_services',
        // new field 👇
        'is_refund_required',
    ];

    protected $with = [
        'purchased_tickets',
    ];
    protected $appends = [
        'total_amount',
        'with_me_amount',
        'transfered_amount'
    ];

    protected $casts = [
        'extra_services' => 'json',
    ];

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

    public function payer()
    {
        return $this->morphTo();
    }

    public function getTotalAmountAttribute()
    {
        return $this->purchased_tickets->sum('total');
    }
    public function getWithMeAmountAttribute()
    {
        return $this->purchased_tickets->whereNull('transfered_to_attendee_id')->sum('total');
    }
    public function getTransferedAmountAttribute()
    {
        return $this->purchased_tickets->whereNotNull('transfered_to_attendee_id')->sum('total');
    }
}
