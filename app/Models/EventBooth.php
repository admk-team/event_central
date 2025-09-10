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
        'attendee_id',
        'type',
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
    public function attendee()
    {
        // Update the class & table if yours is different
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
}
