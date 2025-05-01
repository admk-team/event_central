<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_app_id',
        'email_template_id',
        'name',
        'subject',
        'status',
    ];
}
