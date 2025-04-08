<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionCheckIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendee_id',
        'session_id',
        'checked_in',
        'qr_code',
        'event_app_id'
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
    public function session()
    {
        return $this->belongsTo(EventSession::class, 'session_id');
    }
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

}
