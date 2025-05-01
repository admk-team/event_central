<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\BaseTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
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

    public function baseTemplate()
    {
        $baseTemplate = BaseTemplate::get();

        return Inertia::render('Organizer/Events/BaseTemplate/Index', [
            'baseTemplate' => $baseTemplate,
        ]);
    }

    public function setEmailTemplate(BaseTemplate $basetemplate)
    {
        $eventEmailTemplate = null;
    }

    public function viewBaseTemplate(BaseTemplate $baseTemplate)
    {
        return Inertia::render('Organizer/Events/BaseTemplate/Show', [
            'baseTemplate' => $baseTemplate,
        ]);
    }
}
