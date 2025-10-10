<?php

namespace App\Traits;

use Pusher\PushNotifications\PushNotifications;
use App\Models\Attendee;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Google\Client;

trait SendsWebPushNotifications
{
    public function sendWebPushNotification(int $userId, string $title, string $body, string $deepLink): void
    {
        try {
            // ✅ Pusher Beams (Web)
            $beamsClient = new PushNotifications([
                "instanceId" => config('services.pusher_beams.instance_id'),
                "secretKey"  => config('services.pusher_beams.secret_key'),
            ]);

            $interest = 'attendee-' . $userId;

            $payload = [
                "web" => [
                    "notification" => [
                        "title"     => $title,
                        "body"      => $body,
                        "deep_link" => $deepLink,
                    ],
                ],
            ];

            $beamsClient->publishToInterests([$interest], $payload);

            // ✅ FCM (Mobile)
            if ($attendee = Attendee::find($userId)) {
                if (!empty($attendee->fcm_token)) {
                    $this->sendFcmV1Notification($attendee->fcm_token, $title, $body, $deepLink);
                }
            }

        } catch (\Exception $e) {
            Log::error('Error sending push notification: ' . $e->getMessage());
        }
    }

    /**
     * Send mobile push via Firebase Cloud Messaging (HTTP v1)
     */
    public function sendFcmV1Notification($fcmToken, $title, $body, $deepLink)
    {
        try {
            $client = new Client();
            $client->setAuthConfig(storage_path('app/firebase/service-account.json'));
            $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
            $accessToken = $client->fetchAccessTokenWithAssertion()['access_token'];

            $projectId = config('services.fcm.project_id');
            $url = "https://fcm.googleapis.com/v1/projects/{$projectId}/messages:send";

            $response = Http::withToken($accessToken)
                ->post($url, [
                    'message' => [
                        'token' => $fcmToken,
                        'notification' => [
                            'title' => $title,
                            'body'  => $body,
                        ],
                        'data' => [
                            'deep_link' => $deepLink,
                        ],
                    ],
                ]);

            Log::info('✅ FCM V1 Response:', [$response->json()]);
        } catch (\Exception $e) {
            Log::error('❌ FCM V1 Error: ' . $e->getMessage());
        }
    }
}
