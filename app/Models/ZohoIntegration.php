<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZohoIntegration extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'client_id',
        'client_secret',
        'redirect_uri',
        'access_token',
        'refresh_token',
        'expires_at',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function isExpired()
    {
        return !$this->expires_at || now()->greaterThan($this->expires_at);
    }
}
