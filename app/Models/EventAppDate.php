<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppDate extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'date_time'
    ];

    public function eventSessions(){
        return $this->hasMany(eventSession::class,'event_date_id');
    }
}
