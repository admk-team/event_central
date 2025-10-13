<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveStreamSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'gumlet_api_key',
        'gumlet_live_source_id',
    ];
}
