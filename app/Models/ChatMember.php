<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ChatMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'participant_id',
        'participant_type',
        'unread_count'
    ];

    public function event()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function participant(): MorphTo
    {
        return $this->morphTo(); // can be User or Attendee
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_id', session('event_id'));
    }
}
