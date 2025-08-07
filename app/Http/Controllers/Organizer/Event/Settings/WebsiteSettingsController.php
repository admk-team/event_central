<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Footer;
use App\Models\Header;
use App\Models\Page;
use App\Models\EventPartnerCategory;
use App\Models\EventPartner;
use App\Models\ReferralLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

class WebsiteSettingsController extends Controller
{
    public function index(): Response
    {
        if (! Auth::user()->can('view_website')) {
            abort(403);
        }

        $currentEvent = EventApp::find(session('event_id'));

        $this->createDefaults($currentEvent);
       // dd(route('organizer.events.settings.website.preview', $currentEvent->uuid));

        return Inertia::render("Organizer/Events/Settings/Website/Index", [
            'websiteStatus' => eventSettings()->getValue('website_status', false),
            'url' => route('organizer.events.website', $currentEvent->uuid),
            // 'headers' => $this->datatable(Header::where('event_app_id', session('event_id'))),
            // 'pages' => $this->datatable(Page::where('event_app_id', session('event_id'))),
            // 'footers' => $this->datatable(Footer::where('event_app_id', session('event_id'))),
            // 'homePageSelected' => $currentEvent->pages()->homePage()->count() !== 0,
            'previewUrl' => route('organizer.events.settings.website.preview', $currentEvent->uuid),
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
    public function preview(Request $request, $uuid)
    {
       // dd(Route::currentRouteName());
        $event = EventApp::where('uuid', $uuid)->first();
        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        $partnerCategories = EventPartnerCategory::where('event_app_id', $event->id)->with(['partners'])->get();
        $currentUrl = $request->fullUrl();
        $link = $request->query('link');
        // Check if the session already has the 'visited_url' set
        if ($link) {
            if (!session()->has('referral_link')) {
                // If not, store the full URL in the session
                session(['referral_link' => $currentUrl]);
                Log::info('URL set in session: ' . $currentUrl);
                if (session('referral_link')) {
                    $link = ReferralLink::where('url', $currentUrl)->first();
                    if ($link) {
                        $link->nextcount += 1;
                        $link->save();
                    }
                }
            }
        }
        $exhibitors = EventPartner::where('event_app_id', $event->id)->where('type', 'exhibitor')->orderBy('company_name', 'asc')->get();
        $isPreviewMode = Route::currentRouteName() === 'organizer.events.settings.website.preview';
        //dd($isPreviewMode);
        return view('event-website.index', compact('event', 'colors', 'partnerCategories', 'exhibitors','isPreviewMode'));
    }
}
