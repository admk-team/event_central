<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;



class Attendee extends Authenticatable
{
    use HasFactory;

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
        'twitter_link,',
        'country',
        'phone',
        'bio',
        'type',
        'avatar',
        'qr_code'
    ];

    protected $appends = [
        'avatar' => 'avatar_img',
        'qr_code' => 'qr_code_img'
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

    public function eventSessions()
    {
        return $this->belongsToMany(EventSession::class, 'attendee_event_sessions')->withPivot('rating', 'rating_description')->withTimestamps();
    }
}
