<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("Organizer/Events/Settings/Website/Index", [
            'websiteStatus' => eventSettings()->getValue('website_status', false),
            'pages' => $this->datatable(Page::where('event_app_id', session('event_id'))),
        ]);
    }

    public function toggleStatus()
    {
        $value = eventSettings()->getValue('website_status', false);
        eventSettings()->set('website_status', !$value);
        return back()->withSuccess(!$value ? "Activated" : "Deactivated");
    }
}
