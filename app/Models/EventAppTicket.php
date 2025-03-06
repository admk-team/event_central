<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppTicket extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'type',
        'price',
        'addon_features',
        'event_app_id'
    ];

    protected $eventAppTicket = ['session_ids'];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function sessions()
    {
        return $this->belongsToMany(EventSession::class, 'session_ticket');
    }
    public function getSessionIdsAttribute()
    {
        return $this->sessions()->pluck('event_session_id');
    }
}
