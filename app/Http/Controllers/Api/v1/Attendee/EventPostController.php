<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Models\EventApp;
use App\Models\EventPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EventPostController extends Controller
{
    public function getPostsMore(String $id)
    {
        $attendee = Auth::user()->id;
        $eventApp = EventApp::find(Auth::user()->event_app_id);
        $newsfeeds = EventPost::where('event_app_id', $eventApp->id)->where('session_id', $id)->get();

        return response()->json([
            'event' => $eventApp,
            'newsfeeds' => $newsfeeds,
            'attendee' => $attendee
        ]);
    }

    public function pollToggle(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::where('id', $request->post_id)->first();
        if (!$event) {
            return response()->json(['message' => 'Event Not Found'], 404);
        }
        $pollData = json_decode($event->post_poll, true);
        // Remove user ID from all "like" arrays
        foreach ($pollData as &$option) {
            $option['like'] = array_values(array_diff($option['like'], [$userId]));
        }
        // Add user ID to the selected option's "like" array
        if (isset($pollData[$request->option])) {
            $pollData[$request->option]['like'][] = $userId;
        }
        // Encode data back to JSON and update the column
        $event->post_poll = json_encode($pollData);
        $event->save();

        return response()->json(['message' => 'Poll Updated Successfull']);
    }

    public function toggleLike(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::find($request->post_id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $likes = json_decode($event->likes, true) ?? [];
        $dislikes = json_decode($event->dis_likes, true) ?? [];

        // Remove user from dislikes
        $dislikes = array_values(array_diff($dislikes, [$userId]));

        // Toggle like
        if (in_array($userId, $likes)) {
            $likes = array_values(array_diff($likes, [$userId])); // Remove like
        } else {
            $likes[] = $userId; // Add like
        }

        $event->likes = json_encode($likes);
        $event->dis_likes = json_encode($dislikes);
        $event->save();

        return response()->json([
            'message' => 'Like/Dislike updated successfully',
            'likes' => $likes,
            'dislikes' => $dislikes
        ]);
    }

    public function toggleDislike(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::find($request->post_id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $likes = json_decode($event->likes, true) ?? [];
        $dislikes = json_decode($event->dis_likes, true) ?? [];

        // Remove user from likes
        $likes = array_values(array_diff($likes, [$userId]));

        // Toggle dislike
        if (in_array($userId, $dislikes)) {
            $dislikes = array_values(array_diff($dislikes, [$userId])); // Remove dislike
        } else {
            $dislikes[] = $userId; // Add dislike
        }

        $event->likes = json_encode($likes);
        $event->dis_likes = json_encode($dislikes);
        $event->save();

        return response()->json([
            'message' => 'Like/Dislike updated successfully',
            'likes' => $likes,
            'dislikes' => $dislikes
        ]);
    }
}
