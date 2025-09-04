<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReminderEventEmail extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id','days'
    ];
}
