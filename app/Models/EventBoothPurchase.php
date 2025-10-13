<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventBoothPurchase extends Model
{
    protected $fillable = [
        'event_app_id',
        'event_booth_id',
        'attendee_id',
        'amount',
        'currency',
        'status',
        'payment_intent_id',
        'number',
    ];

    /**
     * Get the booth that was purchased.
     */
    public function eventBooth()
    {
        return $this->belongsTo(EventBooth::class, 'event_booth_id');
    }
      public function scopeCurrentEvent($query)
    {
        return $query->where('event_app_id', session('event_id'));
    }

    /**
     * Get the attendee who purchased the booth.
     */
    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
    public function booth()
    {
        return $this->belongsTo(EventBooth::class, 'event_booth_id');
    }
}
