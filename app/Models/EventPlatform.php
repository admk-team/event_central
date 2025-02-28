<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPlatform extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function eventsessions(){
       return $this->hasMany(EventSession::class, 'event_platform_id','id');
    }
}
