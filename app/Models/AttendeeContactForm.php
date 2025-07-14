<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeContactForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'attendee_id',
        'subject',
        'content',
    ];

    // relationship

    public function event_app()
    {
        return $this->belongsTo(EventApp::class, 'event_id');  
    }

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
}
