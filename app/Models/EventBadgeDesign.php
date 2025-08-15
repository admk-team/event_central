<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventBadgeDesign extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_app_id',
        'custom_badge_attendee_id'
    ];

    public function customBadgeAttendee()
    {
        return $this->belongsTo(CustomBadgeAttendee::class, 'custom_badge_attendee_id');
    }

    public function eventApp()
    {
        return $this->belongsTo(EventApp::class);
    }
}
