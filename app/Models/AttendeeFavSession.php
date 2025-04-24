<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeFavSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'attendee_id',
        'event_session_id',
        'fav',
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }

    public function session()
    {
        return $this->belongsTo(EventSession::class, 'event_session_id');
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }
}
