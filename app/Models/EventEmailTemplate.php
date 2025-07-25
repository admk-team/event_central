<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventEmailTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_app_id',
        'name',
        'editor_content',
        'mail_content',
        'thumbnail',
    ];
}
