<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendee extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'event_pass',
        'name',
        'email',
        'password',
        'avatar',
        'phone',
        'qr_code'
    ];
}
