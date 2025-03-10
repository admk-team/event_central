<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\StoreHeaderRequest;
use App\Http\Requests\Organizer\Event\UpdateHeaderRequest;
use App\Models\Header;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HeaderController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHeaderRequest $request)
    {
        $input = $request->validated();

        $input['event_app_id'] = session('event_id');
        $input['user_id'] = Auth::id();
        $input['content'] = '';

        // Select as default if this is first header
        $headersExist = Header::where('event_app_id', session('event_id'))->count() !== 0;
        if (! $headersExist) {
            $input['is_default'] = true;
        }

        Header::create($input);

        return back()->withSuccess("Created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHeaderRequest $request, Header $header)
    {
        $input = $request->validated();

        $header->update($input);

        return back()->withSuccess("Updated");
    }

    public function toggleDefault(Header $header)
    {
        if (! $header->is_default) {
            Header::query()->update(['is_default' => false]);
        }

        $header->is_default = !$header->is_default;
        $header->save();

        return back()->withSuccess($header->is_default ? "Header selected as default" : "Header unselected as default");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Header::find($id)?->delete();
        return back()->withSuccess("Deleted");
    }

    public function destroyMany(Request $request)
    {   
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            Header::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }

    public function builder(Header $header)
    {
        return Inertia::render("Organizer/Events/Settings/Website/HeaderBuilder", [
            'header' => $header,
        ]);
    }

    public function builderSave(Request $request, Header $header)
    {  
        $header->title = $request->header_title;
        $header->content = $request->header_data? $request->header_data: '';
        $header->save();
        return back()->withSuccess("Saved");
    }
}
