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

        $eventId = session('event_id');

        if (! $eventId) {
            abort(400, 'No event selected.');
        }

        // Ensure the default templates exist
        $defaults = ['Default', 'Design1', 'Design2', 'Design3', 'Design4', 'Design5'];

        foreach ($defaults as $name) {
            CustomBadgeAttendee::firstOrCreate(
                [
                    'event_app_id' => $eventId,
                    'name'         => $name,
                ],
                [
                    'thumbnail'      => "templates/{$name}.png",
                    'user_id'        => auth()->id(),
                    // If these are meant to be strings, set appropriate defaults instead of user id
                    'custom_code'    => null,
                    'editor_content' => null,
                    'mail_content'   => null,
                ]
            );
        }

        // Fetch templates for this event
        $baseTemplate = CustomBadgeAttendee::where('event_app_id', $eventId)->get();

        // Get or create current design
        $current = EventBadgeDesign::where('event_app_id', $eventId)->first();

        if (! $current) {
            // Fallback: set "Default" as the current template
            $defaultTemplate = CustomBadgeAttendee::where('event_app_id', $eventId)
                ->where('name', 'Default')
                ->first();

            if ($defaultTemplate) {
                $current = EventBadgeDesign::create([
                    'user_id'                  => auth()->id(),   // ← fixed
                    'event_app_id'             => $eventId,
                    'custom_badge_attendee_id' => $defaultTemplate->id,
                ]);
            }
        }

        return Inertia::render('Organizer/Events/BadgeTemplate/Index', [
            'baseTemplate'       => $baseTemplate,
            'selectedTemplateId' => optional($current)->custom_badge_attendee_id,
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

    public function setBadgeTemplate(CustomBadgeAttendee $baseTemplate)
    {
        if (! Auth::user()->can('create_default_email_template')) {
            abort(403);
        }
        EventBadgeDesign::updateOrCreate([
            'event_app_id' => session('event_id'),
        ], [
            'custom_badge_attendee_id' => $baseTemplate->id,
        ]);
        return redirect()->route('organizer.events.badge-template.index')->with('success', 'Badge template Selected successfully.');
    }

    public function setBaseBadgeTemplate(BaseTemplate $baseTemplate)
    {
        if (! Auth::user()->can('create_default_email_template')) {
            abort(403);
        }

        CustomBadgeAttendee::create([
            'user_id' => auth()->id(),
            'event_app_id' => session('event_id'),
            'name' => $baseTemplate->name,
            'editor_content' => $baseTemplate->editor_content,
            'mail_content' => $baseTemplate->mail_content,
            'thumbnail' => $baseTemplate->thumbnail,
        ]);

        return redirect()->route('organizer.events.badge-template.index')->with('success', 'Badge template Selected successfully.');
    }
}
