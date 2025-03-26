<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionCheckIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendee_id',
        'session_id',
        'checked_in',
        'qr_code',
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'attendee_id');
    }
}
