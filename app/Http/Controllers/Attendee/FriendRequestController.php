<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\ChatMember;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Traits\SendsWebPushNotifications;

class FriendRequestController extends Controller
{
    use SendsWebPushNotifications; // ✅ Import here
    public function Index()
    {
        $authUser = Auth::user();
        // return the message if account is private 
        if ($authUser->is_public == 0) {
            return back()->withError('Your account is private');
        }
        $attendees = Attendee::where('event_app_id', $authUser->event_app_id)
            ->where('id', '!=', $authUser->id)
            ->where('is_public', true)
            ->get()
            ->map(function ($attendee) use ($authUser) {
                $attendee->has_sent_request = $authUser->hasFriendRequestPending($attendee);
                return $attendee;
            });
        $incomingRequests = Auth::user()->receivedFriendRequests()->where('status', 'pending')->with(['sender'])->get();
        $friends = Auth::user()->friends()->get();
        return Inertia::render('Attendee/FriendRequest/Index', compact('attendees', 'incomingRequests', 'friends'));
    }

    // send friend request 
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:attendees,id'
        ]);

        $sender = Auth::user();
        $receiver = Attendee::findOrFail($request->receiver_id);

        // Prevent sending to self
        if ($sender->id === $receiver->id) {
            return back()->withError('You cannot send a request to yourself.');
        }

        // Check if already sent
        if ($sender->hasFriendRequestPending($receiver)) {
            return back()->withError('Friend request already sent.');
        }

        // Check if already received from this user
        if ($sender->hasFriendRequestReceived($receiver)) {
            return back()->withError('This user already sent you a request.');
        }

        // Check if already friends
        if ($sender->isFriendsWith($receiver)) {
            return back()->withError('You are already friends.');
        }

        FriendRequest::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'status' => 'pending',
        ]);

        // Send Push Notification via trait
        $this->sendWebPushNotification(
            $receiver->id,
            'Follow Request',
            "{$sender->name} sent you a follow request",
            route('friend.index')
        );

        return back()->withSuccess('Friend request sent.');
    }

    public function AcceptRequest(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:attendees,id'
        ]);

        $user = Auth::user();
        $sender = Attendee::findOrFail($request->sender_id);

        if ($user->acceptFriendRequest($sender)) {
            // initiate chat between two friends
            $this->chatInitiate($user, $sender);

            // Send Push Notification to the sender
            $this->sendWebPushNotification(
                $sender->id,
                'Follow Request Accepted',
                "{$user->name} accepted your follow request",
                route('friend.index')
            );

            return back()->withSuccess('Friend request accepted.');
        }

        return back()->withError('Unable to accept request.');
    }


    // remove friend
    public function remove(Request $request)
    {
        $request->validate([
            'friend_id' => 'required|exists:attendees,id'
        ]);

        $user = Auth::user();
        $friend = Attendee::findOrFail($request->friend_id);

        if ($user->removeFriend($friend)) {
            // Send Push Notification to the removed friend
            $this->sendWebPushNotification(
                $friend->id,
                'Friend Removed',
                "{$user->name} has removed you as a friend.",
                route('friend.index')
            );
            return back()->withSuccess('Friend removed successfully.');
        }

        return back()->withError('Failed to remove friend.');
    }

    //initiate chat function
    public function chatInitiate($user, $participant)
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
