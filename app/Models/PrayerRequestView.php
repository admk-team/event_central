<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrayerRequestView extends Model
{
    use HasFactory;
      protected $fillable = [
        'prayer_request_id',
        'attendee_id',
    ];
}
