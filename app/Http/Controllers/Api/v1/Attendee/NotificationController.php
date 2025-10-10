<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;
use App\Traits\SendsWebPushNotifications;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    /**
     * Save the attendee's FCM token for mobile notifications.
     */
    public function saveFcmToken(Request $request)
    {
        $request->validate([
            'fcm_token' => 'required|string',
        ]);

        $user = Attendee::findOrFail(auth()->id());
        $user->fcm_token = $request->fcm_token;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'FCM token saved successfully',
        ]);
    }
    public function testFcm(Request $request)
    {
        $request->validate([
            'fcm_token' => 'required|string',
        ]);

        try {
            $token = $request->input('fcm_token');

            // 🔹 Inline use of your trait
            $tester = new class {
                use \App\Traits\SendsWebPushNotifications;
            };

            // 🔹 Send test notification
            $tester->sendFcmV1Notification(
                $token,
                '🚀 Test Push',
                'This is a test notification from Laravel',
                'https://yourapp.com/test'
            );

            return response()->json([
                'success' => true,
                'message' => '✅ FCM test notification sent successfully!',
                'token_used' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('❌ Test FCM Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
