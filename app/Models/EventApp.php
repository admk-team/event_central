<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EventApp extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'regis_page_id',
        'name',
        'logo',
        'description',
        'start_date',
        'end_date',
        'location_type',
        'location_base',
        'type',
        'schedual_type',
    ];

    protected $appends = [
        'created_at' => 'created_at_date',
        'logo' => 'logo_img'
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

    // getters

    public function getCreatedAtDateAttribute()
    {
        return $this->created_at->format('d M, Y');
    }
    public function getLogoImgAttribute()
    {
        return $this->logo ? url(Storage::url($this->logo)) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }
    // scopes
    public function scopeOrganizer($query)
    {
        $query->where('organizer_id', Auth::id());
    }

    // Relations
    public function event_sessions()
    {
        return $this->hasMany(EventSession::class);
    }
    public function event_speakers()
    {
        return $this->hasMany(EventSpeaker::class);
    }
}
