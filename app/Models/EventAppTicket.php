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
        'event_app_id',

        'increment_by',
        'increment_rate',
        'increment_type',
        'start_increment',
        'end_increment',
    ];

    protected $appends = ['selected_sessions'];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }

    public function sessions()
    {
        return $this->belongsToMany(EventSession::class, 'session_ticket');
    }
    public function getSelectedSessionsAttribute()
    {
        return $this->sessions()->select(['id as value', 'name as label'])->get();
    }
}
