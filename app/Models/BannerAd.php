<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerAd extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_id',
        'event_app_id',
        'name',
        'image',
        'status',
        'feature_on_homepage',
    ];
}
