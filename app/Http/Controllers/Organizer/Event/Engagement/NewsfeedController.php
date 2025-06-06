<?php

namespace App\Http\Controllers\Organizer\Event\Engagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\Engagement\EventPostRequest;
use App\Models\EventApp;
use App\Models\EventPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsfeedController extends Controller
{
    public function index(String $session_id)
    {
        if (! Auth::user()->can('view_posts')) {
            abort(403);
        }

        $events = EventApp::ofOwner()->get();
        $newsfeeds = EventPost::where('event_app_id', session('event_id'))->where('session_id', $session_id)->get();
        return Inertia::render('Organizer/Events/Engagment/Newsfeed/Index', compact('newsfeeds', 'events', 'session_id'));
    }

    public function store(EventPostRequest $request)
    {
        if (! Auth::user()->can('create_posts')) {
            abort(403);
        }

        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        $data['post_poll'] = $request->post_poll;
        $data['session_id'] = $request->session_id;
        if ($data['image']) {
            $name = uniqid() . '.' . $data['image']->getClientOriginalName();
            $data['image'] = $data['image']->storeAs('posts/images', $name, 'public');
        }
        EventPost::create($data);
        return back()->withSuccess('Post created successfully');
    }

    public function updatePost(Request $request, EventPost $post)
    {
        if (! Auth::user()->can('edit_posts')) {
            abort(403);
        }

        $data = $request->all();
        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $name = uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
            $data['image'] = $request->file('image')->storeAs('posts/images', $name, 'public');
        } else {
            $data['image'] = $post->image;
        }
        $post->update($data);
        return back()->with('success', 'Post updated successfully!');
    }

    public function destroy(EventPost $post)
    {
        if (! Auth::user()->can('delete_posts')) {
            abort(403);
        }

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();
        return back()->withSuccess('Newsfeed deleted successfully');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_posts')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventPost::find($id)?->delete();
        }
        return back()->withSuccess('Newsfeeds deleted successfully');
    }
}
