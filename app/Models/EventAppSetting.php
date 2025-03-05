<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventAppSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_app_id',
        'key',
        'value',
        'type',
        'group',
        'description',
    ];

    protected function value(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                switch ($attributes['type']) {
                    case 'number':
                        $value = $value + 0;
                        break;
                    case 'json':
                        $value = json_decode($value, true);
                        break;
                    case 'boolean':
                        $value = (boolean) $value;
                        break;
                }
                return $value;
            },
            set: function (mixed $value, array $attributes) {
                if ($attributes['type'] === 'json')
                    $value = json_encode($value);
                return $value;
            },
        );
    }
}
