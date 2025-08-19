<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaitingList extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendee_id',
        'event_app_ticket_id'
    ];

    public function attendee()
    {
        return $this->belongsTo(Attendee::class, 'id');
    }
}
