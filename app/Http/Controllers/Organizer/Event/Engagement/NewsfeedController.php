<?php

namespace App\Http\Controllers\Organizer\Event\Engagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\Engagement\EventPostRequest;
use App\Models\EventPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsfeedController extends Controller
{
    public function index(Request $request)
    {
        $newsfeeds = EventPost::where('event_app_id', session('event_id'))->get();
        return Inertia::render('Organizer/Events/Engagment/Newsfeed/Index', compact('newsfeeds'));
    }

    public function store(EventPostRequest $request)
    {
        logger($request->all());

        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        $data['post_poll'] = $request->post_poll;
        if ($data['image']) {
            $name = uniqid() . '.' . $data['image']->getClientOriginalName();
            $data['image'] = $data['image']->storeAs('posts/images', $name, 'public');
        }
        EventPost::create($data);
        return back()->withSuccess('Post created successfully');
    }

    public function update(EventPostRequest $request, EventPost $post)
    {
        $data = $request->validated();
        if ($data['image'] && $post->image) {
            Storage::disk('public')->delete($post->image);
            $name = uniqid() . '.' . $data['image']->getClientOriginalName();
            $data['image'] = $data['image']->storeAs('posts/images', $name, 'public');
        }
        $post->update($data);
        return back();
    }

    public function destroy(EventPost $post)
    {
        $post->delete();
        return back()->withSuccess('Newsfeed deleted successfully');
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventPost::find($id)?->delete();
        }
        return back()->withSuccess('Newsfeeds deleted successfully');
    }
}
