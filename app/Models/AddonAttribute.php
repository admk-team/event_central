<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonAttribute extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function addon()
    {
        return $this->belongsTo(Addon::class);
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function options()
    {
        return $this->hasMany(AddonAttributeOption::class);
    }
}
