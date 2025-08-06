<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventBadge extends Model
{
    use HasFactory;
    protected $fillable = [
        'title','description', 'icon', 'type', 'points', 'milestone', 'event_app_id'
    ];
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
