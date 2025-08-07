<?php

namespace App\Http\Controllers\Organizer;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ZohoIntegration;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Support\Facades\Http;

class ZohoController extends Controller
{
    public function index()
    {
        $keys = $keys = ZohoIntegration::firstOrCreate(
            ['organizer_id' => auth()->user()->id],
            [
                'client_id' => '',
                'client_secret' => '',
                'redirect_uri' => '',
            ]
        );
        return Inertia::render('Organizer/Zoho/Index', [
            'keys' => $keys
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'client_id' => 'required|string',
            'client_secret' => 'required|string',
            'redirect_uri' => 'required|url',
        ]);

        ZohoIntegration::updateOrCreate(
            ['organizer_id' => auth()->user()->id],
            [
                'client_id' => $input['client_id'],
                'client_secret' => $input['client_secret'],
                'redirect_uri' => $input['redirect_uri'],
            ]
        );

        return back()->withSuccess('Zoho credentials updated successfully');
    }

    public function form()
    {
        $integration = ZohoIntegration::firstWhere('organizer_id', auth()->id());
        return Inertia::render('Zoho/Form', [
            'integration' => $integration,
        ]);
    }

    public function saveKeys(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|string',
            'client_secret' => 'required|string',
        ]);

        ZohoIntegration::updateOrCreate(
            ['organizer_id' => auth()->id()],
            $validated
        );

        return redirect()->route('zoho.connect');
    }

    public function connect()
    {
        $integration = ZohoIntegration::firstWhere('organizer_id', auth()->id());
        if (!$integration) return redirect()->route('zoho.form')->with('error', 'Enter your credentials first.');

        $params = http_build_query([
            'scope' => 'ZohoCRM.modules.ALL',
            'client_id' => $integration->client_id,
            'response_type' => 'code',
            'access_type' => 'offline',
            'redirect_uri' => route('organizer.zoho.callback'),
        ]);

        return redirect("https://accounts.zoho.com/oauth/v2/auth?$params");
    }

    public function callback(Request $request)
    {
        $integration = ZohoIntegration::firstWhere('organizer_id', auth()->id());

        $res = Http::asForm()->post('https://accounts.zoho.com/oauth/v2/token', [
            'code' => $request->code,
            'client_id' => $integration->client_id,
            'client_secret' => $integration->client_secret,
            'grant_type' => 'authorization_code',
            'redirect_uri' => route('organizer.zoho.callback'),
        ]);

        $data = $res->json();

        $integration->update([
            'access_token' => $data['access_token'],
            'refresh_token' => $data['refresh_token'],
            'expires_at' => now()->addSeconds($data['expires_in']),
        ]);

        return redirect()->route('organizer.zoho.index')->withSuccess('Zoho Connected!');
    }

    public function sync(EventApp $event)
    {
        $integration = ZohoIntegration::firstWhere('organizer_id', auth()->id());

        if ($integration->isExpired()) {
            $this->refreshToken($integration);
        }

        $attendees = $event->attendees; // Ensure this relation exists

        $payload = [
            'data' => $attendees->map(function ($attendee) {
                return [
                    'First_Name' => $attendee->first_name,
                    'Last_Name' => $attendee->last_name ?? '',
                    'Email' => $attendee->email,
                    'Phone' => $attendee->phone,
                    'Description' => 'Event Attendee',
                ];
            })->toArray(),
        ];

        $module = $event->zohoSettings->module ?? 'Leads';

        $response = Http::withToken($integration->access_token)
            ->post("https://www.zohoapis.com/crm/v2/{$module}", $payload);

        return response()->json($response->json());
    }

    protected function refreshToken(ZohoIntegration $integration)
    {
        $res = Http::asForm()->post('https://accounts.zoho.com/oauth/v2/token', [
            'refresh_token' => $integration->refresh_token,
            'client_id' => $integration->client_id,
            'client_secret' => $integration->client_secret,
            'grant_type' => 'refresh_token',
        ]);

        $data = $res->json();

        $integration->update([
            'access_token' => $data['access_token'],
            'expires_at' => now()->addSeconds($data['expires_in']),
        ]);
    }
}
