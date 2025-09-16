<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\MailchimpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MailChimpController extends Controller
{
    public function index()
    {
        $keys = MailchimpSetting::firstOrCreate(
            ['organizer_id' => auth()->user()->id],
            [
                'api_key' => '',
                'server_prefix' => '',
                'audience_id' => '',
            ]
        );
        return Inertia::render('Organizer/MailChimp/Index', [
            'keys' => $keys
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'api_key' => 'required|string',
            'server_prefix' => 'required|string',
            'audience_id' => 'required|string',
        ]);

        MailchimpSetting::updateOrCreate(
            ['organizer_id' => auth()->user()->id],
            [
                'api_key' => $input['api_key'],
                'server_prefix' => $input['server_prefix'],
                'audience_id' => $input['audience_id'],
            ]
        );

        return back()->withSuccess('Mailchimp credentials updated successfully');
    }

    public function showSyncPage()
    {
        $events = EventApp::where('organizer_id', auth()->id())
            ->select('id', 'name')
            ->get();

        return Inertia::render('Organizer/MailChimp/SyncForm', [
            'events' => $events
        ]);
    }

    public function sync(Request $request, EventApp $event)
    {
        $integration = MailchimpSetting::firstWhere('organizer_id', auth()->id());

        if (!$integration) {
            return back()->withError('Mailchimp integration not found');
        }

        $apiKey = $integration->api_key;
        $server = $integration->server_prefix; // e.g. us3
        $listId = $integration->audience_id;

        $attendees = $event->attendees; // Collection of attendees

        $synced = 0;
        $errors = [];

        foreach ($attendees as $attendee) {
            if (!$attendee->email) {
                continue; // skip invalid
            }

            $email = strtolower(trim($attendee->email));
            $subscriberHash = md5($email);

            // Add or update member in Mailchimp audience
            $response = Http::withBasicAuth('anystring', $apiKey)
                ->put("https://{$server}.api.mailchimp.com/3.0/lists/{$listId}/members/{$subscriberHash}", [
                    "email_address" => $email,
                    "status_if_new" => "subscribed",
                    "status" => "subscribed",
                    "merge_fields" => [
                        "FNAME" => $attendee->first_name ?? '',
                        "LNAME" => $attendee->last_name ?? '',
                        'COMPANY'  => $attendee->company ?? '',
                        'PHONE'    => $attendee->phone ?? '',
                    ],
                ]);

            if ($response->failed()) {
                $errors[] = [
                    'email' => $email,
                    'error' => $response->json(),
                ];
                continue;
            }

            // Add event tag (e.g., event-123)
            $tagResponse = Http::withBasicAuth('anystring', $apiKey)
                ->post("https://{$server}.api.mailchimp.com/3.0/lists/{$listId}/members/{$subscriberHash}/tags", [
                    "tags" => [
                        ["name" => "event-{$event->id}", "status" => "active"]
                    ]
                ]);

            if ($tagResponse->failed()) {
                $errors[] = [
                    'email' => $email,
                    'error' => $tagResponse->json(),
                ];
                continue;
            }

            $synced++;
        }

        return response()->json([
            'message' => "Sync completed",
            // 'synced' => $synced,
            'errors' => $errors,
        ]);
    }
}
