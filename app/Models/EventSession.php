<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class EventSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'event_speaker_id',
        'event_platform_id',
        'type',
        'description',
        'capacity',
        'start_date',
        'end_date',
        'event_app_id',
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function eventSpeaker(): BelongsTo
    {
        return $this->belongsTo(EventSpeaker::class);
    }

    public function event_platform()
    {
        return $this->belongsTo(EventPlatform::class, 'event_platform_id', 'id');
    }

    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(Attendee::class, 'attendee_event_session')->withPivot('rating', 'rating_description')->withTimestamps();
    }
}
