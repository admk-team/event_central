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

        $beamsClient->publishToInterests(
            ['attendee-' . $userId],
            [
                "web" => [
                    "notification" => [
                        "title"      => $title,
                        "body"       => $body,
                        "deep_link"  => $deepLink,
                    ]
                ]
            ]
        );
    }
}
