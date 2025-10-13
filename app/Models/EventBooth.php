<?php

// app/Models/EventBooth.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventBooth extends Model

{
    const TYPE_BOOTH   = 'booth';
    const TYPE_SPONSOR = 'sponsor ad';
    const TYPE_BANNER  = 'banner';
    protected $fillable = [
        'event_app_id',
        'name',
        'description',
        'number',
        'status',
        'logo',
        'price',     // points
        'type',
        'total_qty',
        'sold_qty'
    ];

    protected $casts = [
        'number' => 'integer',
        'price'  => 'integer',
    ];

    // scope like your EventBadge::currentEvent()
    public function scopeCurrentEvent($query)
    {
        return $query->where('event_app_id', session('event_id'));
    }
    public function purchases()
    {
        return $this->hasMany(EventBoothPurchase::class, 'event_booth_id');
    }

    // Many attendees through purchases
    public function attendees()
    {
        return $this->belongsToMany(Attendee::class, 'event_booth_purchases', 'event_booth_id', 'attendee_id');
    }

    public function getRemainingAttribute(): int
    {
        return max(0, (int)$this->total_qty - (int)$this->sold_qty);
    }
}
