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
        return Inertia::render("Admin/Color_themes/Index", compact('colorschemes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $colorschemes = ColorScheme::latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Admin/Color_themes/CreateOrEdit");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ColorSchemeRequest $request)
    {
        $input = $request->validated();
        // dd('after validate');
        ColorScheme::create($input);

        return redirect()->route('admin.color-themes.index')->with('success', 'Themes created successfully.');
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
        $colorTheme = ColorScheme::findOrFail($id);
        return Inertia::render("Admin/Color_themes/CreateOrEdit", compact('colorTheme'));
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(ColorSchemeRequest $request, ColorScheme $color_theme)
    {
        $data = $request->validated();
        $color_theme->update($data);
        return to_route('admin.color-themes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ColorScheme $color_theme)
    {
        $color_theme->delete();
        return back()->withSuccess('Deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            ColorScheme::find($id)?->delete();
        }

        return back()->withSuccess('Deleted successfully.');
    }
}
