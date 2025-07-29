<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrayerRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'request_type',
        'message',
        'event_app_id',
        'attendee_id',
        'status',
        'count',
    ];
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
    public function eventApp()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }
}
