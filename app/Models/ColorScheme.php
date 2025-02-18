<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorScheme extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_id',
        'title',
        'bg_color',
        'header_bg_color',
        'nav_bg_color',
        'card_bg_color',
        'primary_color',
        'secondary_color',
        'footer_color',
    ];

    // Relation with events
    public function event(){
        return $this->belongsTo(EventApp::class);
    }
}
