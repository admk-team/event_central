<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\EventPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EventPostsController extends Controller
{
    public function getPosts(String $id)
    {
        if (! Auth::user()->can('view_posts')) {
            abort(403);
        }

        $posts = EventPost::where('session_id', $id)->get();
        if ($posts) {
            return response()->json([
                'message' => 'Post fetched successfully',
                'data' => $posts
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Post not found',
            ], 404);
        }
    }

    public function createPost(Request $request)
    {
        if (! Auth::user()->can('create_posts')) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image',
            'send_notification' => 'boolean',
            'sending_date' => 'nullable|date',
            'sending_time' => 'nullable',
            "event_app_id" => 'required',
            "post_poll" => 'nullable',
            "session_id" => 'required',
        ]);

        $data = $request->only([
            'title',
            'content',
            'send_notification',
            'sending_date',
            'sending_time',
            'event_app_id',
            'post_poll',
            'session_id'
        ]);

        if ($request->hasFile('image')) {
            $name = uniqid() . '.' . $request->image->getClientOriginalName();
            $imagePath = $request->image->storeAs('posts/images', $name, 'public');
            $data['image'] = $imagePath;
        }

        // Example: Save post
        $post = EventPost::create($data);

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    public function destroy(String $id)
    {
        if (! Auth::user()->can('delete_posts')) {
            abort(403);
        }
        $post = EventPost::find($id);
        if ($post) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Post not found',
            ], 404);
        }
    }

    public function editPost($id)
    {
        if (! Auth::user()->can('edit_posts')) {
            abort(403);
        }

        $post = EventPost::find($id);
        if ($post) {
            return response()->json([
                'data' => $post
            ]);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Post not found',
            ], 404);
        }
    }

    public function updatePost(Request $request, $id)
    {
        if (! Auth::user()->can('edit_posts')) {
            abort(403);
        }

        $post = EventPost::find($id);

        if ($post) {
            $request->validate([
                'title' => 'required|string',
                'content' => 'nullable|string',
                'image' => 'nullable|image',
                'send_notification' => 'boolean',
                'sending_date' => 'nullable|date',
                'sending_time' => 'nullable',
                "event_app_id" => 'required',
                "post_poll" => 'nullable',
                "session_id" => 'required',
            ]);

            $data = $request->only([
                'title',
                'content',
                'send_notification',
                'sending_date',
                'sending_time',
                'event_app_id',
                'post_poll',
                'session_id'
            ]);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($post->image && Storage::disk('public')->exists($post->image)) {
                    Storage::disk('public')->delete($post->image);
                }

                $name = uniqid() . '.' . $request->image->getClientOriginalName();
                $imagePath = $request->image->storeAs('posts/images', $name, 'public');
                $data['image'] = $imagePath;
            }

            $post->update($data);

            return response()->json([
                'message' => 'Post updated successfully',
                'data' => $post
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Post not found',
            ], 404);
        }
    }
}
