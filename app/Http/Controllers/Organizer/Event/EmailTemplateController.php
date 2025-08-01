<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use App\Models\BaseTemplate;
use Illuminate\Http\Request;
use App\Services\TemplateService;
use App\Models\EventEmailTemplate;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Console\Scheduling\Event;
use App\Http\Requests\Organizer\Event\TemplateRequest;
use Illuminate\Support\Facades\Auth;

class EmailTemplateController extends Controller
{
    protected $templateService;
    public function __construct(TemplateService $templateService)
    {
        $this->templateService = $templateService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_email_template')) {
            abort(403);
        }

        $baseTemplate = EventEmailTemplate::where('event_app_id', session('event_id'))->get();

        return Inertia::render('Organizer/Events/EmailTemplate/Index', [
            'baseTemplate' => $baseTemplate,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (! Auth::user()->can('create_email_template')) {
            abort(403);
        }

        return Inertia::render('Organizer/Events/EmailTemplate/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TemplateRequest $request)
    {
        if (! Auth::user()->can('create_email_template')) {
            abort(403);
        }

        $input = $request->validated();
        $input['user_id'] = auth()->id();
        $input['event_app_id'] = session('event_id');

        $templateService = $this->templateService->store($input);
        return redirect()->route('organizer.events.email-template.index')->with('success', 'Email template created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(EventEmailTemplate $EmailTemplate)
    {
        if (! Auth::user()->can('view_email_template')) {
            abort(403);
        }

        return Inertia::render('Organizer/Events/EmailTemplate/Show', [
            'baseTemplate' => $EmailTemplate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventEmailTemplate $EmailTemplate)
    {
        if (! Auth::user()->can('edit_email_template')) {
            abort(403);
        }

        return Inertia::render('Organizer/Events/EmailTemplate/Edit', [
            'eventId' => session('event_id'),
            'EmailTemplate' => $EmailTemplate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TemplateRequest $request, EventEmailTemplate $EmailTemplate)
    {
        if (! Auth::user()->can('edit_email_template')) {
            abort(403);
        }

        $input = $request->validated();
        $input['user_id'] = auth()->id();
        $input['event_app_id'] = session('event_id');

        DB::transaction(function () use ($EmailTemplate, $input) {
            $this->templateService->update($EmailTemplate, $input);
        }, 2);

        return redirect()->route('organizer.events.email-template.index')->with('success', 'Email template created successfully.');
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
        if (! Auth::user()->can('view_default_email_template')) {
            abort(403);
        }

        $baseTemplate = BaseTemplate::get();

        return Inertia::render('Organizer/Events/BaseTemplate/Index', [
            'baseTemplate' => $baseTemplate,
        ]);
    }

    public function setEmailTemplate(BaseTemplate $baseTemplate)
    {
        if (! Auth::user()->can('create_default_email_template')) {
            abort(403);
        }

        EventEmailTemplate::create([
            'user_id' => auth()->id(),
            'event_app_id' => session('event_id'),
            'name' => $baseTemplate->name,
            'editor_content' => $baseTemplate->editor_content,
            'mail_content' => $baseTemplate->mail_content,
            'thumbnail' => $baseTemplate->thumbnail,
        ]);

        return redirect()->route('organizer.events.email-template.index')->with('success', 'Email template Selected successfully.');
    }

    public function viewBaseTemplate(BaseTemplate $baseTemplate)
    {
        if (! Auth::user()->can('view_default_email_template')) {
            abort(403);
        }

        return Inertia::render('Organizer/Events/BaseTemplate/Show', [
            'baseTemplate' => $baseTemplate,
        ]);
    }
}
