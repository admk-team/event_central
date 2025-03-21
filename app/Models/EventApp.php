<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Log;

class EventApp extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'organizer_id',
        'regis_page_id',
        'name',
        // 'logo',    Causing issue while updating event
        'description',
        'location_type',
        'location_base',
        'type',
        'schedual_type',
        'event_app_category_id',
        'is_recurring',
        'recurring_type_id',
    ];

    protected $casts = [
        'is_recurring' => 'boolean',
        'registration_private' => 'boolean'
    ];
    protected $appends = [
        'start_date',   //Picks first date from dates table
        'created_at' => 'created_at_date',
        'logo' => 'logo_img',
        'registration_private',
        'registration_link'
    ];
    protected $with = [
        'category',
        'recurring_type'
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
        return $this->belongsTo(EventAppCategory::class, 'event_app_category_id');
    }

    public function recurring_type()
    {
        return $this->belongsTo(RecurringType::class);
    }

    public function dates()
    {
        return $this->hasMany(EventAppDate::class);
    }

    public function form()
    {
        return $this->hasOne(Form::class);
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function headers()
    {
        return $this->hasMany(Header::class);
    }

    public function footers()
    {
        return $this->hasMany(Footer::class);
    }
    public function tickets()
    {
        return $this->hasMany(EventAppTicket::class);
    }


    public function getStartDateAttribute()
    {
        $temp = $this->dates()->first();
        return $temp ? $temp->date : null;
    }

    public function getRegistrationPrivateAttribute()
    {
        if (session('event_id')) {
            return eventSettings()->getValue('registration_private', false);
        }
        return null;
    }

    public function getRegistrationLinkAttribute()
    {
        if (session('event_id')) {
            return eventSettings()->getValue('registration_link');
        }
        return null;
    }

    //     Registering Model Life Cycle Events
    protected static function booted()
    {
        static::deleting(function (EventApp $event) { // before delete() method call this
            if ($event->logo) {
                try {
                    $file = storage_path('app/public' . $event->logo);
                    if (file_exists($file)) {
                        unlink($file);
                    }
                } catch (Exception $ex) {
                    Log::info($ex->getMessage());
                }
            }
        });
    }
    public function questions()
    {
        return $this->hasMany(Question::class, 'event_app_id');
    }
}
