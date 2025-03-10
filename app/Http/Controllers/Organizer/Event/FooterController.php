<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\StoreFooterRequest;
use App\Http\Requests\Organizer\Event\UpdateFooterRequest;
use App\Models\Footer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FooterController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFooterRequest $request)
    {
        $input = $request->validated();

        $input['event_app_id'] = session('event_id');
        $input['user_id'] = Auth::id();
        $input['content'] = '';

        // Select as default if this is first footer
        $footersExist = Footer::where('event_app_id', session('event_id'))->count() !== 0;
        if (! $footersExist) {
            $input['is_default'] = true;
        }

        Footer::create($input);

        return back()->withSuccess("Created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFooterRequest $request, Footer $footer)
    {
        $input = $request->validated();

        $footer->update($input);

        return back()->withSuccess("Updated");
    }

    public function toggleDefault(Footer $footer)
    {
        if (! $footer->is_default) {
            Footer::query()->update(['is_default' => false]);
        }

        $footer->is_default = !$footer->is_default;
        $footer->save();

        return back()->withSuccess($footer->is_default ? "Footer selected as default" : "Footer unselected as default");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Footer::find($id)?->delete();
        return back()->withSuccess("Deleted");
    }

    public function destroyMany(Request $request)
    {   
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            Footer::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }

    public function builder(Footer $footer)
    {
        return Inertia::render("Organizer/Events/Settings/Website/FooterBuilder", [
            'footer' => $footer,
        ]);
    }

    public function builderSave(Request $request, Footer $footer)
    {  
        $footer->title = $request->footer_title;
        $footer->content = $request->footer_data? $request->footer_data: '';
        $footer->save();
        return back()->withSuccess("Saved");
    }
}
