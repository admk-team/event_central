<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Cast;

class EventProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'name',
        'description',
        'price',
        'old_price',
        'stock',
        'sold_qty',
        'sizes',
        'image'
    ];

    protected $appends = ['image_url'];

    protected $casts = [
        'sizes' => 'array'
    ];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'id');
    }

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
