<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class Attendee extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'email',
        'password',
        'event_app_id',
        'first_name',
        'last_name',
        'company',
        'position',
        'other_link',
        'facebook_link',
        'linkedin_link',
        'twitter_link',
        'country',
        'phone',
        'bio',
        'type',
        'avatar',
        'qr_code',
        'location'
    ];

    protected $appends = [
        'avatar' => 'avatar_img',
        'qr_code' => 'qr_code_img'
    ];

    protected $hidden = [
        'password'
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function getAvatarImgAttribute()
    {
        return $this->avatar ? url($this->avatar) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }

    public function getQrCodeImgAttribute()
    {
        return $this->qr_code != 'EMPTY' ? url(Storage::url($this->qr_code)) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }

    public function eventSelectedSessions()
    {
        return $this->belongsToMany(EventSession::class, 'attendee_event_session')->withPivot('rating', 'rating_description')->withTimestamps();
    }

    public function eventApp()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function payments()
    {
        return $this->hasMany(AttendeePayment::class, 'attendee_id');
    }

    public function attendeePayments()
    {
        return $this->morphMany(AttendeePayment::class, 'payer');
    }

    public function attendeeFavSession()
    {
        return $this->hasMany(AttendeeFavSession::class);
    }

    public function purchased_tickets()
    {
        $tickets =  AttendeePurchasedTickets::where(function ($subQuery) {
            $subQuery->where(function ($subSubQuery) {
                $subSubQuery->where('attendee_id', $this->id);
                $subSubQuery->where('is_transfered', 0);
            });
            $subQuery->orWhere('transfered_to_attendee_id', $this->id);
        })->with(['ticket'])->get();
        return $tickets;
    }

    public function sessionRatings()
    {
        return $this->belongsToMany(EventSession::class, 'session_ratings')->withPivot('rating', 'rating_description')->withTimestamps();
    }

    public function eventCheckin()
    {
        return $this->hasOne(EventCheckIns::class, 'attendee_id');
    }

    public function ratedSessions()
    {
        return $this->belongsToMany(EventSession::class, 'session_ratings', 'attendee_id', 'event_session_id')
            ->withPivot('rating', 'rating_description')
            ->withTimestamps();
    }

    public function attendeeEventSessions()
    {
        return $this->hasMany(AttendeeEventSession::class, 'attendee_id', 'id');
    }
}
