<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EventSpeaker extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'name',
        'avatar',
        'company',
        'position',
        'bio',
        'email',
        'phone',
        'web',
        'linkedin',
        'facebook',
        'twitter',
        'instagram',
        'country',
        'language',
    ];

    public function getAvatarAttribute($value)
    {
        return $value ? url(Storage::url($value)) : null;
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function eventSessions()
    {
        // Updated to many-to-many relationship
        return $this->belongsToMany(EventSession::class, 'event_session_speakers');
    }
}