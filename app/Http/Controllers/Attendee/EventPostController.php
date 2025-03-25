<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventPost;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventPostController extends Controller
{
    /**
     * edit the polling data into the post
     */
    public function pollToggle(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::where('id', $request->post_id)->first();

        if (!$event) {
            return abort(404);
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
    }

    public function toggleLike(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::find($request->post_id);

        if (!$event) {
            return abort(404);
        }

        // Decode likes and dislikes
        $likes = json_decode($event->likes, true) ?? [];
        $dislikes = json_decode($event->dis_likes, true) ?? [];

        // Remove user from dislikes (if they had disliked before)
        $dislikes = array_values(array_diff($dislikes, [$userId]));

        // Toggle like: if user already liked, remove; otherwise, add
        if (in_array($userId, $likes)) {
            $likes = array_values(array_diff($likes, [$userId])); // Remove like
        } else {
            $likes[] = $userId; // Add like
        }

        // Update post
        $event->likes = json_encode($likes);
        $event->dis_likes = json_encode($dislikes);
        $event->save();
    }

    public function toggleDislike(Request $request)
    {
        $userId = Auth::id();
        $event = EventPost::find($request->post_id);

        if (!$event) {
            return abort(404);
        }

        // Decode likes and dislikes
        $likes = json_decode($event->likes, true) ?? [];
        $dislikes = json_decode($event->dis_likes, true) ?? [];

        // Remove user from likes (if they had liked before)
        $likes = array_values(array_diff($likes, [$userId]));

        // Toggle dislike: if user already disliked, remove; otherwise, add
        if (in_array($userId, $dislikes)) {
            $dislikes = array_values(array_diff($dislikes, [$userId]));
        } else {
            $dislikes[] = $userId;
        }

        // Update post
        $event->likes = json_encode($likes);
        $event->dis_likes  = json_encode($dislikes);
        $event->save();
    }
}
