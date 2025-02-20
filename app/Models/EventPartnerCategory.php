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
}
