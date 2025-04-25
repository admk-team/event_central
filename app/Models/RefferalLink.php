<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefferalLink extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'event_app_id', 'url', 'nextcount', 'name'];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
    public function attendees()
{
    return $this->hasMany(Attendee::class, 'referral_link', 'url');
}
}
