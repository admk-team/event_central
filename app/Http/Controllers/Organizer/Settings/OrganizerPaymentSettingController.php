<?php

namespace App\Http\Controllers\Organizer\Settings;

use App\Http\Controllers\Controller;
use App\Models\OrganizerPaymentKeys;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class OrganizerPaymentSettingController extends Controller
{

    public function index()
    {
        if (! Auth::user()->can('edit_payment_settings')) {
            abort(403);
        }

        $keys = OrganizerPaymentKeys::firstOrCreate(
            ['user_id' => auth()->user()->id],
            [
                'paypal_base_url' => '',
                'paypal_pub' => '',
                'paypal_secret' => '',
                'stripe_secret_key' => '',
                'stripe_publishable_key' => '',
            ]
        );
        return Inertia::render("Organizer/PaymentSettings/Index", compact('keys'));
    }


    public function update(Request $request)
    {
        if (! Auth::user()->can('edit_payment_settings')) {
            abort(403);
        }

        $input = $request->validate([
            'paypal_base_url' => 'nullable|string',
            'paypal_secret' => 'nullable|string',
            'paypal_pub' => 'nullable|string',

            'stripe_secret_key' => 'nullable|string',
            'stripe_publishable_key' => 'nullable|string',
        ]);
        OrganizerPaymentKeys::updateOrCreate(
            ['user_id' => auth()->user()->id],
            [
                'paypal_base_url' => $input['paypal_base_url'],
                'paypal_pub' => $input['paypal_pub'],
                'paypal_secret' => $input['paypal_secret'],
                'stripe_secret_key' => $input['stripe_secret_key'],
                'stripe_publishable_key' => $input['stripe_publishable_key'],
            ]
        );

        return back()->withSuccess('Payment details updated successfully');
    }
}
