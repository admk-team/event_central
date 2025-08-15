<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use App\Models\BaseTemplate;
use App\Models\EventBadgeDesign;
use Illuminate\Support\Facades\DB;
use App\Models\CustomBadgeAttendee;
use App\Http\Controllers\Controller;
use App\Services\CustomBadgeService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Organizer\Event\TemplateRequest;

class CustomBadgeController extends Controller
{
    protected $templateService;
    public function __construct(CustomBadgeService $templateService)
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

        $baseTemplate = CustomBadgeAttendee::where('event_app_id', session('event_id'))->get();

        return Inertia::render('Organizer/Events/BadgeTemplate/Index', [
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

        return Inertia::render('Organizer/Events/BadgeTemplate/Create');
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
        return redirect()->route('organizer.events.badge-template.index')->with('success', 'Badge template created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomBadgeAttendee $badgeTemplate)
    {
        if (! Auth::user()->can('view_email_template')) {
            abort(403);
        }

        return Inertia::render('Organizer/Events/BadgeTemplate/Show', [
            'baseTemplate' => $badgeTemplate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomBadgeAttendee $badgeTemplate)
    {
        if (! Auth::user()->can('edit_email_template')) {
            abort(403);
        }
        return Inertia::render('Organizer/Events/BadgeTemplate/Edit', [
            'eventId' => session('event_id'),
            'EmailTemplate' => $badgeTemplate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TemplateRequest $request, CustomBadgeAttendee $badgeTemplate)
    {
        if (! Auth::user()->can('edit_email_template')) {
            abort(403);
        }

        $input = $request->validated();
        $input['user_id'] = auth()->id();
        $input['event_app_id'] = session('event_id');

        DB::transaction(function () use ($badgeTemplate, $input) {
            $this->templateService->update($badgeTemplate, $input);
        }, 2);

        return redirect()->route('organizer.events.badge-template.index')->with('success', 'Badge template Updated successfully.');
    }

    public function setBadgeTemplate(BaseTemplate $baseTemplate)
    {
        if (! Auth::user()->can('create_default_email_template')) {
            abort(403);
        }
        EventBadgeDesign::create([
            'user_id' => auth()->id(),
            'event_app_id' => session('event_id'),
            'custom_badge_attendee_id' => $baseTemplate->id,
        ]);

        return redirect()->route('organizer.events.badge-template.index')->with('success', 'Badge template Selected successfully.');
    }
}
