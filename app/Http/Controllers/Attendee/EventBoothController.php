<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Mail\EventSponsorshipAwardedMail;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventBooth;
use App\Models\EventBoothPurchase;
use App\Models\OrganizerPaymentKeys;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EventBoothController extends Controller
{
    protected StripeService $stripe_service;

    public function __construct(StripeService $stripeService)
    {
        $this->stripe_service = $stripeService;
    }

    // app/Http/Controllers/Attendee/EventBoothController.php

    public function index()
    {
        $attendee = Auth::user();
        $eventApp = EventApp::findOrFail($attendee->event_app_id);

        // Marketplace: all listings for this event (pull the fields the UI needs)
        $booths = EventBooth::where('event_app_id', $attendee->event_app_id)
            ->orderBy('number')
            ->get([
                'id',
                'name',
                'description',
                'number',
                'status',
                'logo',
                'price',
                'type',
                'total_qty',
                'sold_qty'
            ]);

        // My purchases (grouped by booth), include booth fields + my_qty
        $purchases = EventBoothPurchase::with([
            'booth:id,name,description,number,status,logo,price,type,total_qty,sold_qty'
        ])
            ->where('event_app_id', $attendee->event_app_id)
            ->where('attendee_id', $attendee->id)
            ->get();

        $myBooths = $purchases->groupBy('event_booth_id')->map(function ($rows) {
            $qty   = (int) $rows->sum('quantity');    // make sure your purchase model has 'quantity' (default 1)
            $booth = $rows->first()->booth;

            return [
                'id'          => $booth->id,
                'name'        => $booth->name,
                'description' => $booth->description,
                'number'      => $booth->number,
                'status'      => $booth->status,
                'logo'        => $booth->logo,
                'price'       => $booth->price,
                'type'        => $booth->type,
                'total_qty'   => $booth->total_qty,
                'sold_qty'    => $booth->sold_qty,
                'my_qty'      => $qty,                 // <-- user-owned quantity for this listing
            ];
        })->values();

        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        return Inertia::render('Attendee/EventBooth/Index', [
            'booths'      => $booths,
            'myBooths'    => $myBooths,
            'getCurrency' => $getCurrency,
        ]);
    }
    public function checkoutPage(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) {
            abort(404);
        }

        // If completely sold out, bounce back to list
        if ($booth->sold_qty >= $booth->total_qty) {
            return redirect()->route('attendee.event.booths')
                ->withError('This booth is not available.');
        }

        $eventApp    = EventApp::findOrFail($attendee->event_app_id);
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);
        $currency    = $getCurrency['currency'];

        // Stripe keys (publishable, etc.)
        $stripeKeys = $this->stripe_service->StripKeys($booth->event_app_id);

        // Create a fresh PaymentIntent for this attempt
        $pi = $this->stripe_service->createPaymentIntent(
            $booth->event_app_id,
            (float) ($booth->price ?? 0),
            $currency
        );

        // Keep the shape your Payment page expects
        $payment = [
            'id'            => $booth->id,
            'total_amount'  => $booth->price,
            'stripe_intent' => $pi['client_secret'], // PaymentElement client_secret
        ];

        // Create/update a PENDING purchase record for this user & booth
        EventBoothPurchase::updateOrCreate(
            [
                'event_booth_id' => $booth->id,
                'attendee_id'    => $attendee->id,
                // keep the same row for retries until it is paid
                'status'         => 'pending',
            ],
            [
                'event_app_id'       => $booth->event_app_id,
                'amount'             => (int) $booth->price,
                'currency'           => $currency ?? 'USD',
                'payment_intent_id'  => $pi['payment_id'] ?? null, // <- store PI id, not the secret
            ]
        );

        return Inertia::render('Attendee/EventBooth/Payment/Index', [
            'payment'         => $payment,
            'stripe_pub_key'  => $stripeKeys->stripe_publishable_key,
            'paypal_client_id' => null,
            'currency'        => $currency,
            'getCurrency'     => $getCurrency,
        ]);
    }
    public function updateBooth(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) {
            abort(404);
        }
        return DB::transaction(function () use ($booth, $attendee) {
            $locked = EventBooth::whereKey($booth->id)->lockForUpdate()->firstOrFail();

            if ($locked->sold_qty >= $locked->total_qty) {
                return response()->json([
                    'status'  => false,
                    'message' => 'This item is sold out.',
                ], 409);
            }

            // Find the attendee's latest purchase for this booth
            $purchase = EventBoothPurchase::where('event_booth_id', $locked->id)
                ->where('attendee_id', $attendee->id)
                ->orderByDesc('id')
                ->lockForUpdate()
                ->first();

            // If already paid, return idempotent success
            if ($purchase && $purchase->status === 'paid') {
                return response()->json([
                    'status'  => true,
                    'message' => 'Already purchased.',
                ]);
            }
            // Mark purchase as PAID
            $purchase->status = 'paid';
            $purchase->save();

            // Increment stock counters and update availability
            $locked->sold_qty = $locked->sold_qty + 1;
            $locked->status   = ($locked->sold_qty >= $locked->total_qty) ? 'soldout' : 'available';
            $locked->save();

            // Email the attendee
            $this->sendEmail($locked, $attendee);

            return response()->json([
                'status'  => true,
                'message' => 'Booth purchased successfully.',
            ]);
        });
    }

    public function successView()
    {

        return Inertia::render('Attendee/EventBooth/Payment/PaymentSuccess');
    }

    public function paymentCancel()
    {
        return Inertia::render('Attendee/EventBooth/Payment/PaymentCancel');
    }
    private function sendEmail(EventBooth $booth, Attendee $attendee): void
    {
        $eventapp = EventApp::find($booth->event_app_id);

        if ($eventapp && $attendee && $attendee->email) {
            Mail::to($attendee->email)->send(
                new EventSponsorshipAwardedMail($eventapp, $booth, $attendee)
            );
        }
    }
}
