<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class EventSession extends Model
{
    use HasFactory;
    protected $appends = ['session_selected'];

    protected $fillable = [
        'name',
        'event_speaker_id',
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

    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(Attendee::class, 'attendee_event_sessions')->withPivot('rating', 'rating_description')->withTimestamps();
    }

    // checking if logged in user has selected the session or not
    public function getSessionSelectedAttribute()
    {
        $session = auth()->user()->eventSessions()->where('event_session_id', $this->id)->first();
        return $session ? true : false;
    }
}
