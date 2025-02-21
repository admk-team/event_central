<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppPayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'stripe_pub',
        'stripe_secret',
        'paypal_pub',
        'paypal_secret',
    ];
}
