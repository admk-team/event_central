<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'sender_id',
        'receiver_id',
        'status',
        'accepted_at'
    ];

    protected $casts = [
        'accepted_at' => 'datetime'
    ];

    public function sender()
    {
        return $this->belongsTo(Attendee::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(Attendee::class, 'receiver_id');
    }
    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeBlocked($query)
    {
        return $query->where('status', 'blocked');
    }
}
