<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class EventAppImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'image_file_name',
        'image_url',
        'is_feature_image',
    ];

    public function event()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->attributes['image_url'] ? url(Storage::url($this->attributes['image_url'])) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }
}
