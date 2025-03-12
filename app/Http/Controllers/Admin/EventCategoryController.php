<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\EventCategoryRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use App\Models\EventAppCategory;

class EventCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eventcategory = $this->datatable(EventAppCategory::query());
        return Inertia::render('Admin/EventCategory/index', compact('eventcategory'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventCategoryRequest $request)
    {
        $data = $request->validated();
        EventAppCategory::create($data);
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventCategoryRequest $request, string $eventcategory)
    {
        $request->validated();
        $editEvent = EventAppCategory::find($eventcategory);
        $editEvent->name = $request->name;
        $editEvent->save();
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $eventcategory)
    {
        EventAppCategory::destroy($eventcategory);
        return back();
    }

    public function destroyMany(Request $request)
    {
        $input = $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventAppCategory::destroy($id);
        }
    }
}
