<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EventPost extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'created_at' => 'created_at_date',
        'image' => 'img'
    ];

    // getters

    public function getCreatedAtDateAttribute()
    {
        return $this->created_at->format('d M, Y');
    }

    public function getImgAttribute()
    {
        return $this->image ? url(Storage::url($this->image)) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
