<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class EventSession extends Model
{
    use HasFactory;
    protected $appends = ['selected_by_attendee'];
    protected $fillable = [
        'name',
        'event_speaker_id',
        'event_date_id',
        'event_platform_id',
        'type',
        'description',
        'capacity',
        'start_time',
        'end_time',
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

    public function eventPlatform()
    {
        return $this->belongsTo(EventPlatform::class, 'event_platform_id', 'id');
    }

    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(Attendee::class, 'attendee_event_session')->withPivot('rating', 'rating_description')->withTimestamps();
    }
    public function eventDate(){
        return $this->belongsTo(EventAppDate::class,'event_date_id');
    }

    public function getSelectedByAttendeeAttribute()
    {
        if (auth('attendee')->check()) {
            return $this->attendees()->where('attendee_id', auth('attendee')->user()->id)->first() ? true : false;
        }
        return null;
    }
}
