<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveStream extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'event_app_id',
        'status',
        'stream_key',
        'live_asset_id',
        'live_video_source_id',
        'resolution',
        'stream_url',
        'playback_url',
        'thumbnail',
        'start_time',
    ];

    protected $casts = [
        'start_time' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(EventApp::class);
    }
}
