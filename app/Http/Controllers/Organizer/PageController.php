<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:pages',
        ]);

        $input['event_app_id'] = session('event_id');
        $input['user_id'] = Auth::id();
        $input['content'] = '';

        Page::create($input);

        return back()->withSuccess("Created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        dd($page);
        $input = $request->validate([
            'title' => 'required',
            'slug' => [
                'required',
                Rule::unique('pages')->ignore($page->id),
            ],
        ]);

        $page->update($input);

        return back()->withSuccess("Updated");
    }

    public function togglePublish(Page $page)
    {
        $page->is_published = !$page->is_published;
        $page->save();
        return back()->withSuccess($page->is_published ? "Published" : "Unpublished");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Page::find($id)?->delete();
        return back()->withSuccess("Deleted");
    }

    public function destroyMany(Request $request)
    {   
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            Page::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
}
