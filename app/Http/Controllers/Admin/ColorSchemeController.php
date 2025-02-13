<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ColorSchemeRequest;
use App\Models\ColorScheme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColorSchemeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Admin/ColorScheme/Index", compact('colorschemes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Admin/ColorScheme/CreateOrEdit");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ColorSchemeRequest $request)
    {
        $input = $request->validated();

        ColorScheme::create($input);

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
