<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;

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
}
