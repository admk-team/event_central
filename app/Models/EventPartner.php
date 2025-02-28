<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPartner extends Model
{
    use HasFactory;


    protected $guarded = [];

    // Define relationships if needed (Example: belongsTo event_app)
    public function partnerCategory()
    {
        return $this->belongsTo(EventPartnerCategory::class, 'partner_category_id');
    }

    public function scopeCurrentEvent($query)
     {
         $query->where('event_app_id', session('event_id'));
     }
}