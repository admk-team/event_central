<?php

namespace App\Traits;

use Pusher\PushNotifications\PushNotifications;
use App\Models\Attendee;

trait SendsWebPushNotifications
{
    public function sendWebPushNotification(int $userId, string $title, string $body, string $deepLink): void
    {
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
            "fcm" => [
                "notification" => [
                    "title" => $title,
                    "body"  => $body,
                ],
                "data" => [
                    "deep_link" => $deepLink,
                ],
            ],
        ];

        // Publish to web/mobile subscribers
        $beamsClient->publishToInterests([$interest], $payload);

        // Additionally send to specific FCM token if stored
        if ($attendee = Attendee::find($userId)) {
            if (!empty($attendee->fcm_token)) {
                $beamsClient->publishToUsers([$attendee->fcm_token], [
                    'fcm' => [
                        'notification' => [
                            'title' => $title,
                            'body'  => $body,
                        ],
                        'data' => [
                            'deep_link' => $deepLink,
                        ],
                    ],
                ]);
            }
        }
    }
}
