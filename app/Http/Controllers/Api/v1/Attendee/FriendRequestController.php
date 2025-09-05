<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\ChatMember;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\SendsWebPushNotifications;

class FriendRequestController extends Controller
{
    use SendsWebPushNotifications;

    // List all friends, pending requests, and attendees
    public function index()
    {
        $authUser = Auth::user();

        if ($authUser->is_public == 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Your account is private'
            ], 403);
        }

        $attendees = Attendee::where('event_app_id', $authUser->event_app_id)
            ->where('id', '!=', $authUser->id)
            ->where('is_public', true)
            ->get()
            ->map(function ($attendee) use ($authUser) {
                $attendee->has_sent_request = $authUser->hasFriendRequestPending($attendee);
                return $attendee;
            });

        $incomingRequests = $authUser->receivedFriendRequests()
            ->where('status', 'pending')
            ->with(['sender'])
            ->get();

        $friends = $authUser->friends()->get();

        return response()->json([
            'status' => 'success',
            'attendees' => $attendees,
            'incoming_requests' => $incomingRequests,
            'friends' => $friends,
        ]);
    }

    // Send Friend Request
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:attendees,id'
        ]);

        $sender = Auth::user();
        $receiver = Attendee::where('id', $request->receiver_id)->first();


        if (!$receiver) {
            return response()->json(['status' => 'error', 'message' => 'Reciver not Found'], 400);
        }

        if ($sender->id === $receiver->id) {
            return response()->json(['status' => 'error', 'message' => 'You cannot send a request to yourself.'], 400);
        }

        if ($sender->hasFriendRequestPending($receiver)) {
            return response()->json(['status' => 'error', 'message' => 'Friend request already sent.'], 400);
        }

        if ($sender->hasFriendRequestReceived($receiver)) {
            return response()->json(['status' => 'error', 'message' => 'This user already sent you a request.'], 400);
        }

        if ($sender->isFriendsWith($receiver)) {
            return response()->json(['status' => 'error', 'message' => 'You are already friends.'], 400);
        }

        FriendRequest::create([
            'event_app_id' => $sender->event_app_id,
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'status' => 'pending',
        ]);

        // Push Notification
        // $this->sendWebPushNotification(
        //     $receiver->id,
        //     'Follow Request',
        //     "{$sender->name} sent you a follow request",
        //     route('friend.index')
        // );

        return response()->json(['status' => 'success', 'message' => 'Friend request sent.']);
    }

    // Accept Friend Request
    public function accept(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:attendees,id'
        ]);

        $user = Auth::user();
        $sender = Attendee::findOrFail($request->sender_id);

        if ($user->acceptFriendRequest($sender)) {
            $this->chatInitiate($user, $sender);

            // $this->sendWebPushNotification(
            //     $sender->id,
            //     'Follow Request Accepted',
            //     "{$user->name} accepted your follow request",
            //     route('friend.index')
            // );

            return response()->json(['status' => 'success', 'message' => 'Friend request accepted.']);
        }

        return response()->json(['status' => 'error', 'message' => 'Unable to accept request.'], 400);
    }

    // Remove Friend
    public function remove(Request $request)
    {
        $request->validate([
            'friend_id' => 'required|exists:attendees,id'
        ]);

        $user = Auth::user();
        $friend = Attendee::findOrFail($request->friend_id);

        if ($user->removeFriend($friend)) {
            // $this->sendWebPushNotification(
            //     $friend->id,
            //     'Friend Removed',
            //     "{$user->name} has removed you as a friend.",
            //     route('friend.index')
            // );

            return response()->json(['status' => 'success', 'message' => 'Friend removed successfully.']);
        }

        return response()->json(['status' => 'error', 'message' => 'Failed to remove friend.'], 400);
    }

    // Private chat initiation between two users
    private function chatInitiate($user, $participant)
    {
        ChatMember::create([
            'event_id' => $user->event_app_id,
            'user_id' => $user->id,
            'user_type' => \App\Models\Attendee::class,
            'participant_id' => $participant->id,
            'participant_type' => \App\Models\Attendee::class,
        ]);

        ChatMember::create([
            'event_id' => $user->event_app_id,
            'user_id' => $participant->id,
            'user_type' => \App\Models\Attendee::class,
            'participant_id' => $user->id,
            'participant_type' => \App\Models\Attendee::class,
        ]);
    }
}
