<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\StorePageRequest;
use App\Http\Requests\Organizer\Event\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        $input = $request->validated();

        $input['event_app_id'] = session('event_id');
        $input['user_id'] = Auth::id();
        $input['content'] = '';

        Page::create($input);

        return back()->withSuccess("Created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page)
    {
        $input = $request->validated();

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

    public function builder(Page $page)
    {
        return Inertia::render("Organizer/Events/Settings/Website/PageBuilder", [
            'page' => $page,
        ]);
    }

    public function builderSave(Request $request, Page $page)
    {
        $page->content = $request->page_data? $request->page_data: '';
        $page->save();
        return back()->withSuccess("Saved");
    }
}
