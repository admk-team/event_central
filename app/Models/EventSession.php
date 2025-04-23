<?php

namespace App\Models;

use App\Models\Traits\HasModelPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class EventSession extends Model
{
    use HasFactory, HasModelPermissions;

    protected $appends = ['selected_by_attendee', 'start_date_time', 'end_date_time', 'is_favourite'];

    protected $fillable = [
        'name',
        'event_date_id',
        'event_platform_id',
        'type',
        'description',
        'capacity',
        'start_time',
        'end_time',
        'qa_status',
        'event_app_id',
        'posts',
        'price'
    ];

    // Removed event_speaker_id from fillable since we're using a pivot table

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function eventSpeakers(): BelongsToMany
    {
        return $this->belongsToMany(EventSpeaker::class, 'event_session_speakers');
    }

    public function eventPlatform()
    {
        return $this->belongsTo(EventPlatform::class, 'event_platform_id', 'id');
    }

    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(Attendee::class, 'attendee_event_session')
            ->withPivot('rating', 'rating_description')
            ->withTimestamps();
    }

    public function eventDate()
    {
        return $this->belongsTo(EventAppDate::class, 'event_date_id');
    }

    public function getSelectedByAttendeeAttribute()
    {
        $user = auth()->user();
        if (auth('attendee')->check()) {
            return $this->attendees()->where('attendee_id', auth('attendee')->user()->id)->first() ? true : false;
        } elseif ($user && $user->tokenCan('role:attendee')) {
            return $this->attendees()->where('attendee_id', $user->id)->exists();
        }
        return null;
    }

    public function getIsFavouriteAttribute()
    {
        $user = auth()->user();

        if (auth('attendee')->check()) {
            return $this->favSessions()
                ->where('attendee_id', auth('attendee')->user()->id)
                ->where('fav', true)
                ->exists();
        } elseif ($user && $user->tokenCan('role:attendee')) {
            return $this->favSessions()
                ->where('attendee_id', $user->id)
                ->where('fav', true)
                ->exists();
        }

        return false;
    }


    public function questions()
    {
        return $this->hasMany(Question::class, 'event_session_id');
    }

    public function getStartDateTimeAttribute()
    {
        return $this->eventDate ? $this->eventDate->date . ' ' . $this->attributes['start_time'] : '';
    }

    public function getEndDateTimeAttribute()
    {
        return $this->eventDate ? $this->eventDate->date . ' ' . $this->attributes['end_time'] : '';
    }

    public function attendances()
    {
        return $this->hasMany(SessionCheckIn::class, 'session_id');
    }

    public function tickets()
    {
        return $this->belongsToMany(EventAppTicket::class, 'session_ticket');
    }

    public function tracks()
    {
        return $this->belongsToMany(Track::class, 'event_session_tracks');
    }

    public function attendeesRating()
    {
        return $this->belongsToMany(Attendee::class, 'session_ratings', 'event_session_id', 'attendee_id')
            ->withPivot('rating', 'rating_description')
            ->withTimestamps();
    }

    public function favSessions()
    {
        return $this->hasMany(AttendeeFavSession::class, 'event_session_id');
    }
}
