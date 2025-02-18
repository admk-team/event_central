<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSpeaker extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'name',
        'avatar',
        'company',
        'position',
        'bio',
        'email',
        'phone',
        'web',
        'linkedin',
        'facebook',
        'twitter',
        'instagram',
        'country',
        'language',
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
