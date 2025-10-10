<?php

namespace App\Traits;

use Pusher\PushNotifications\PushNotifications;

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

        $beamsClient->publishToInterests([$interest], $payload);
    }
}
