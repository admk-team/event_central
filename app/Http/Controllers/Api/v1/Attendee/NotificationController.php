<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Pusher\PushNotifications\PushNotifications;
use App\Models\Attendee;

class NotificationController extends Controller
{
    /**
     * @var \Pusher\PushNotifications\PushNotifications
     */
    private $beamsClient;

    public function __construct()
    {
        $this->beamsClient = new PushNotifications([
            'instanceId' => config('services.pusher_beams.instance_id'),
            'secretKey'  => config('services.pusher_beams.secret_key'),
        ]);
    }

    public function saveFcmToken(Request $request)
    {
        $request->validate([
            'fcm_token' => 'required|string',
        ]);

        $user = Attendee::findOrFail(auth()->id());
        $user->fcm_token = $request->fcm_token;
        $user->save();

        try {
            $this->beamsClient->addDeviceInterest(
                $request->fcm_token,
                'attendee-' . $user->id
            );

            return response()->json([
                'success' => true,
                'message' => 'FCM token saved and subscribed successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
