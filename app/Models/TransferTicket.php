<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendee_id',
        'attendee_payment_id',
        'event_app_id',
        'transfer_email',
    ];
}
