<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Footer;
use App\Models\Header;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function index(): Response
    {
        if (! Auth::user()->can('view_website')) {
            abort(403);
        }

        $currentEvent = EventApp::find(session('event_id'));

        $this->createDefaults($currentEvent);

        return Inertia::render("Organizer/Events/Settings/Website/Index", [
            'websiteStatus' => eventSettings()->getValue('website_status', false),
            'url' => route('organizer.events.website', $currentEvent->uuid),
            // 'headers' => $this->datatable(Header::where('event_app_id', session('event_id'))),
            // 'pages' => $this->datatable(Page::where('event_app_id', session('event_id'))),
            // 'footers' => $this->datatable(Footer::where('event_app_id', session('event_id'))),
            // 'homePageSelected' => $currentEvent->pages()->homePage()->count() !== 0,
            'colors' => eventSettings()->getValue('website_colors', config('event_website.colors')),
        ]);
    }

    public function toggleStatus()
    {
        if (! Auth::user()->can('edit_website')) {
            abort(403);
        }

        $value = eventSettings()->getValue('website_status', false);
        eventSettings()->set('website_status', !$value);
        return back()->withSuccess(!$value ? "Activated" : "Deactivated");
    }

    public function saveColors(Request $request)
    {
        if (! Auth::user()->can('edit_website')) {
            abort(403);
        }
        
        eventSettings()->set('website_colors', $request->colors);
        return back()->withSuccess("Saved");
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
