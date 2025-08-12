<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'user_id',
        'status',
        'total_amount',
        'stripe_id',
        'stripe_intent',
        'payment_method'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
