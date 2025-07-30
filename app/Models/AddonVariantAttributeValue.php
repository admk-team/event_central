<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonVariantAttributeValue extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function variant()
    {
        return $this->belongsTo(AddonVariant::class);
    }

    public function addonAttribute()
    {
        return $this->belongsTo(AddonAttribute::class);
    }

    public function addonAttributeOption()
    {
        return $this->belongsTo(AddonAttributeOption::class);
    }
}
