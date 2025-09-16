<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailchimpSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'api_key',
        'server_prefix',
        'audience_id',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class);
    }
}
