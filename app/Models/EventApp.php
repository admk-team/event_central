<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class EventApp extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'organizer_id',
        'regis_page_id',
        'name',
        'logo',
        'description',
        // 'start_date',        // Columns removed and being managed
        // 'end_date',          // through New table EventAppDate
        'location_type',
        'location_base',
        'type',
        'schedual_type',
        'even_app_category_id',
        'is_recurring',
        'recurring_type_id'
    ];

    protected $casts = [
        'is_curring' => 'boolean'
    ];
    protected $appends = [
        'start_date',   //Picks first date from dates table
        'created_at' => 'created_at_date',
        'logo' => 'logo_img'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

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
    public function scopeOfOwner($query)
    {
        $query->where('organizer_id', Auth::user()?->owner_id);
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

    public function organiser()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function category()
    {
        return $this->belongsTo(EventAppCategory::class);
    }

    public function recurring_type()
    {
        return $this->belongsTo(RecurringType::class);
    }

    public function dates()
    {
        return $this->hasMany(EventAppDate::class);
    }

    public function getStartDateAttribute()
    {
        return $this->dates()->first() ? $this->dates()->first()->date_time : null;
    }
}
