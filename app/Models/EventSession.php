<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventSession extends Model
{
    use HasFactory;
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

    public function event_speaker(): BelongsTo
    {
        return $this->belongsTo(EventSpeaker::class);
    }
}
