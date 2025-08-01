<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonAttributeOption extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function addonAttribute()
    {
        return $this->belongsTo(AddonAttribute::class);
    }

    public function attributeOption()
    {
        return $this->belongsTo(AttributeOption::class);
    }
}
