<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $appends = ['selected_tickets'];
    protected $fillable = [
        'event_app_id',
        'code',
        'description',
        'discount_type',
        'discount_value',
        'usage_limit',
        'used_count',
        'start_date',
        'end_date',
        'status'
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }

    public function tickets()
    {
        return $this->belongsToMany(EventAppTicket::class, 'promo_code_ticket');
    }
    public function getSelectedTicketsAttribute()
    {
        return $this->tickets()->select(['id as value', 'name as label'])->get();
    }
}
