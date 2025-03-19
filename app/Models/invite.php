<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invite extends Model
{
    use HasFactory;
    protected $fillable = [
        'invited_by',
        'invite_to',
        'token',
        'accepted',
    ];

    public function inviter()
    {
        return $this->belongsTo(Attendee::class, 'invited_by');
    }

    public function invitee()
    {
        return $this->belongsTo(Attendee::class, 'invite_to');
    }
}
