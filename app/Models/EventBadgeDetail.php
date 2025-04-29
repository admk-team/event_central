<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventBadgeDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'achieved_points',
        'attendee_id',
        'event_badge_id',
        'content_code',
        'event_app_id',
        'completed_at'
    ];
}
