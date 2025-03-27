<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeAttendance extends Model
{
    use HasFactory;
    protected $fillable = ['event_session_id', 'attendee_id', 'event_app_id', 'check_in','check_out'];
    /**
     * The session this attendance belongs to.
     */
    public function session()
    {
        return $this->belongsTo(EventSession::class, 'event_session_id');
    }

    /**
     * The event this attendance is part of.
     */
    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    /**
     * The attendee who checked in.
     */
    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
}
