<?php

namespace App\Models;

use App\Enums\EventAppFeeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_app_id',
        'name',
        'status',
        'fee_amount',
        'fee_type',
        'description'
    ];

    protected $casts = [
        'fee_type' => EventAppFeeType::class, // Automatically cast to Enum
    ];

    public function tickets()
    {
        return $this->belongsToMany(EventAppTicket::class, 'event_app_ticket_fee');
    }
}
