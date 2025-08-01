<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonVariant extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function addon()
    {
        return $this->belongsTo(Addon::class);
    }

    public function attributeValues()
    {
        return $this->hasMany(AddonVariantAttributeValue::class);
    }
}
