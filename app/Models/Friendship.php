<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_id',
        'friend_id',
        'friends_since'
    ];

    protected $casts = [
        'friends_since' => 'datetime'
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }

    public function friend()
    {
        return $this->belongsTo(Attendee::class, 'friend_id');
    }
}
