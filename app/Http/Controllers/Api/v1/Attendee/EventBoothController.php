<?php

namespace App\Http\Controllers\Api\v1\Attendee;

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

class EventBoothController extends Controller
{
    protected StripeService $stripe_service;

    public function __construct(StripeService $stripeService)
    {
        $this->stripe_service = $stripeService;
    }

    public function index()
    {
        $attendee = Auth::user();
        $eventApp = EventApp::findOrFail($attendee->event_app_id);

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

        $purchases = EventBoothPurchase::with([
            'booth:id,name,description,number,status,logo,price,type,total_qty,sold_qty'
        ])
            ->where('event_app_id', $attendee->event_app_id)
            ->where('attendee_id', $attendee->id)
            ->get();

        $myBooths = $purchases->groupBy('event_booth_id')->map(function ($rows) {
            $qty   = (int) $rows->sum('quantity');
            $purchase = $rows->first();                 // get one purchase row for booth-specific data
            $booth    = $purchase->booth;               // related booth

            return [
                'id'          => $booth->id,
                'name'        => $booth->name,
                'description' => $booth->description,
                'number'      => $purchase->number ?? $booth->number, // ✅ safe fallback to booth->number
                'status'      => $booth->status,
                'logo'        => $booth->logo,
                'price'       => $booth->price,
                'type'        => $booth->type,
                'total_qty'   => $booth->total_qty,
                'sold_qty'    => $booth->sold_qty,
                'my_qty'      => $qty,
            ];
        })->values();

        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);

        return response()->json([
            'status'      => true,
            'booths'      => $booths,
            'myBooths'    => $myBooths,
            'currency'    => $getCurrency,
        ]);
    }

    public function checkoutPage(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) {
            return response()->json(['status' => false, 'message' => 'Unauthorized access'], 403);
        }

        if ($booth->sold_qty >= $booth->total_qty) {
            return response()->json(['status' => false, 'message' => 'This booth is not available.'], 409);
        }

        $eventApp    = EventApp::findOrFail($attendee->event_app_id);
        $getCurrency = OrganizerPaymentKeys::getCurrencyForUser($eventApp->organizer_id);
        $currency    = $getCurrency['currency'];

        $stripeKeys = $this->stripe_service->StripKeys($booth->event_app_id);

        $pi = $this->stripe_service->createPaymentIntent(
            $booth->event_app_id,
            (float) ($booth->price ?? 0),
            $currency
        );

        EventBoothPurchase::updateOrCreate(
            [
                'event_booth_id' => $booth->id,
                'attendee_id'    => $attendee->id,
                'status'         => 'pending',
            ],
            [
                'event_app_id'       => $booth->event_app_id,
                'amount'             => (int) $booth->price,
                'number'             => (int) $booth->number,
                'currency'           => $currency ?? 'USD',
                'payment_intent_id'  => $pi['payment_id'] ?? null,
            ]
        );

        return response()->json([
            'status'           => true,
            'payment'          => [
                'id'            => $booth->id,
                'total_amount'  => $booth->price,
                'stripe_intent' => $pi['client_secret'],
            ],
            'stripe_pub_key'   => $stripeKeys->stripe_publishable_key,
            'currency'         => $currency,
            'getCurrency'      => $getCurrency,
        ]);
    }

    public function updateBooth(EventBooth $booth)
    {
        $attendee = Auth::user();
        if ($booth->event_app_id !== $attendee->event_app_id) {
            return response()->json(['status' => false, 'message' => 'Unauthorized access'], 403);
        }

        return DB::transaction(function () use ($booth, $attendee) {
            $locked = EventBooth::whereKey($booth->id)->lockForUpdate()->firstOrFail();

            if ($locked->sold_qty >= $locked->total_qty) {
                return response()->json(['status' => false, 'message' => 'This item is sold out.'], 409);
            }

            $purchase = EventBoothPurchase::where('event_booth_id', $locked->id)
                ->where('attendee_id', $attendee->id)
                ->orderByDesc('id')
                ->lockForUpdate()
                ->first();

            if ($purchase && $purchase->status === 'paid') {
                return response()->json(['status' => true, 'message' => 'Already purchased.']);
            }

            $purchase->status = 'paid';
            $purchase->save();

            $locked->sold_qty += 1;
            $locked->increment('number');
            $locked->status   = ($locked->sold_qty >= $locked->total_qty) ? 'soldout' : 'available';
            $locked->save();

            $this->sendEmail($locked, $attendee);

            return response()->json(['status' => true, 'message' => 'Booth purchased successfully.']);
        });
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
