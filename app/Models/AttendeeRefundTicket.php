<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeRefundTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_id',
        'attendee_payment_id',
        'event_app_id',
        'status',
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class);
    }
    public function attendeePayment()
    {
        return $this->belongsTo(AttendeePayment::class);
    }
    public function eventApp()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
