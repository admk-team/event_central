<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class OrganizerPaymentKeys extends Model
{
    use HasFactory;
    protected $table = 'organizer_payment_keys';

    protected $fillable = [
        'user_id',
        'stripe_publishable_key',
        'stripe_secret_key',

        'paypal_base_url',
        'paypal_pub',
        'paypal_secret',

        'currency',
        'currency_symbol'
    ];

    // Encrypt the secret key automatically when saving
    public function setStripeSecretKeyAttribute($value)
    {
        $this->attributes['stripe_secret_key'] = encrypt($value);
    }

    // Decrypt the secret key when retrieving
    public function getStripeSecretKeyAttribute($value)
    {
        try {
            return $value ? decrypt($value) : '';
        } catch (\Exception $e) {
            Log::error('Error decrypting Stripe secret key: ' . $e->getMessage());
            return '';
        }
    }

    // Encrypt the secret key automatically when saving
    public function setPaypalSecretAttribute($value)
    {
        $this->attributes['paypal_secret'] = encrypt($value);
    }

    // Decrypt the secret key when retrieving
    public function getPaypalSecretAttribute($value)
    {
        try {
            return $value ? decrypt($value) : '';
        } catch (\Exception $e) {
            Log::error('Error decrypting paypal secret key: ' . $e->getMessage());
            return '';
        }
    }

    public static function getCurrencyForUser($userId)
    {
        $currency = self::where('user_id', $userId)
            ->select('currency', 'currency_symbol')
            ->first();

        return $currency ?? (object)[
            'currency' => 'USD',
            'currency_symbol' => '$'
        ];
    }
}
