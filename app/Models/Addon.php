<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addon extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'event_app_id',
        'name',
        'price',
        'qty_total',
        'qty_sold',
    ];

    protected $appends = ['full_name'];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function scopeCurrentOrganizer($query)
    {
        $query->where('organizer_id', auth()->user()->id);
    }

    public function getFullNameAttribute()
    {
        return $this->name . ($this->price > 0 ? '($' . $this->price . ')' : '(Free)');
    }
}
