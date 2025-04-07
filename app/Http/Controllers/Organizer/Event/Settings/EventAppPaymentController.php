<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventAppPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;


class EventAppPaymentController extends Controller
{
    public function index(): Response
    {
        if (! Auth::user()->can('edit_payment_settings')) {
            abort(403);
        }

        $event = EventAppPayment::firstOrCreate(
            ['event_app_id' => session('event_id')],
            [
                'stripe_pub' => '',
                'stripe_secret' => '',
                'paypal_pub' => '',
                'paypal_secret' => '',
            ]
        );

        return Inertia::render("Organizer/Events/Settings/Payment/Index", compact('event'));
    }


    public function update(Request $request)
    {
        if (! Auth::user()->can('edit_payment_settings')) {
            abort(403);
        }
        
        $input = $request->validate([
            'paypal_secret' => 'nullable|string',
            'paypal_pub' => 'nullable|string',
            'stripe_secret' => 'nullable|string',
            'stripe_pub' => 'nullable|string',
        ]);

        $event = EventAppPayment::where('event_app_id', session('event_id'))->first();

        if ($event) {
            $event->update($input);
        } else {
            return back()->withErrors(['error' => 'Payment record not found']);
        }

        return back()->with('success', 'Payment details updated successfully');
    }
}
