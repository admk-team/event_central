<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Footer;
use App\Models\Header;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function index(): Response
    {
        $currentEvent = EventApp::find(session('event_id'));

        $this->createDefaults($currentEvent);

        return Inertia::render("Organizer/Events/Settings/Website/Index", [
            'websiteStatus' => eventSettings()->getValue('website_status', false),
            'url' => route('organizer.events.website', $currentEvent->uuid),
            'headers' => $this->datatable(Header::where('event_app_id', session('event_id'))),
            'pages' => $this->datatable(Page::where('event_app_id', session('event_id'))),
            'footers' => $this->datatable(Footer::where('event_app_id', session('event_id'))),
            'homePageSelected' => $currentEvent->pages()->homePage()->count() !== 0,
        ]);
    }

    public function toggleStatus()
    {
        $value = eventSettings()->getValue('website_status', false);
        eventSettings()->set('website_status', !$value);
        return back()->withSuccess(!$value ? "Activated" : "Deactivated");
    }

    protected function createDefaults($event)
    {
        // Create default header
        if ($event->headers()->count() === 0) {
            $event->headers()->create([
                'title' => 'Default',
                'content' => '',
                'is_default' => true,
            ]);
        }

        // Create default footer
        if ($event->footers()->count() === 0) {
            $event->footers()->create([
                'title' => 'Default',
                'content' => '',
                'is_default' => true,
            ]);
        }

        // Create home page
        if ($event->pages()->count() === 0) {
            $event->pages()->create([
                'title' => 'Home',
                'slug' => 'home',
                'content' => '',
                'is_home_page' => true,
                'is_published' => true,
                'default_header' => true,
                'default_footer' => true,
            ]);
        }
    }
}
