<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPartnerCategory extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function partners()
    {
        return $this->hasMany(EventPartner::class, 'partner_category_id');
    }
    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }
}
