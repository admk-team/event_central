<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventApp extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'regis_page_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'location_type',
        'location_base',
        'type',
        'schedual_type',
    ];

    // Relationship with Registration Page
    public function registrationPage()
    {
        return $this->belongsTo(RegistrationPage::class, 'regis_page_id');
    }

    // Relationship with Color Scheme
    public function colorSchemes()
    {
        return $this->hasMany(ColorScheme::class, 'event_id');
    }
}
