<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizerPaymentKeys extends Model
{
    use HasFactory;
    protected $table = 'organizer_payment_keys';

    protected $fillable = [
        'user_id',
        'stripe_publishable_key',
        'stripe_secret_key',
        'paypal_pub',
        'paypal_secret',
    ];

    // Encrypt the secret key automatically when saving
    public function setStripeSecretKeyAttribute($value)
    {
        $this->attributes['stripe_secret_key'] = encrypt($value);
    }

    // Decrypt the secret key when retrieving
    public function getStripeSecretKeyAttribute($value)
    {
        return $value ? decrypt($value) : '';
    }

    // Encrypt the secret key automatically when saving
    public function setPaypalSecretAttribute($value)
    {
        $this->attributes['paypal_secret'] = encrypt($value);
    }

    // Decrypt the secret key when retrieving
    public function getPaypalSecretAttribute($value)
    {
        return $value ? decrypt($value) : '';
    }
}
