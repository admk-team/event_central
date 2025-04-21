<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionRating extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendee_id',
        'event_session_id',
        'rating',
        'rating_description'
    ];
    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
    public function session()
    {
        return $this->belongsTo(EventSession::class, 'event_session_id');
    }
}
