<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomBadgeAttendee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_app_id',
        'name',
        'editor_content',
        'mail_content',
        'thumbnail',
        'custom_code'
    ];

    public function eventBadgeDesign()
    {
        return $this->hasOne(EventBadgeDesign::class);
    }
}
