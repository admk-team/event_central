<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppPass extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_session_id',
        'name',
        'description',
        'type',
        'price',
        'increament_by',
        'increament_rate',
        'start_increament',
        'end_increament',
    ];

    public function scopeCurrentEventSe($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
    public function session()
    {
        return $this->belongsTo(EventSession::class, 'event_session_id');
    }
}
