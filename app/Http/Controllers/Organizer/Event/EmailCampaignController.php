<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventCampaign;
use App\Models\EventEmailTemplate;
use App\Http\Controllers\Controller;
use App\Jobs\SendCampaignEmailBatchJob;
use Illuminate\Support\Facades\Auth;

class EmailCampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_email_campaign')) {
            abort(403);
        }

        $eventCampaigns = $this->datatable(EventCampaign::where('event_app_id', session('event_id')));
        return Inertia::render('Organizer/Events/EmailCampaign/Index', [
            'emailcampaign' => $eventCampaigns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if (! Auth::user()->can('create_email_campaign')) {
            abort(403);
        }

        $baseTemplate = EventEmailTemplate::where('event_app_id', session('event_id'))->get();
        $templateId = $request->query('templateId');
        return Inertia::render('Organizer/Events/EmailCampaign/Create', [
            'templateId' => $templateId,
            'baseTemplate' => $baseTemplate,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (! Auth::user()->can('create_email_campaign')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'sent_to' => 'required|string',
            'event_email_template_id' => 'required',
        ]);

        $data = $request->only(['name', 'subject', 'sent_to', 'event_email_template_id']);
        $data['user_id'] = auth()->id();
        $data['event_app_id'] = session('event_id');
        $data['status'] = 'draft';

        $campaign = EventCampaign::create([
            'user_id' => $data['user_id'],
            'event_app_id' => $data['event_app_id'],
            'event_email_template_id' => $data['event_email_template_id'],
            'sent_to' => $data['sent_to'],
            'name' => $data['name'],
            'subject' => $data['subject'],
            'status' => $data['status'],
        ]);

        $emailTemplate = EventEmailTemplate::find($data['event_email_template_id']);
        SendCampaignEmailBatchJob::dispatch($campaign, $emailTemplate);
        return redirect()->route('organizer.events.email-campaign.index')->with('success', 'Email campaign created successfully.');
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
