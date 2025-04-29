<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventPartner;
use App\Models\EventPartnerCategory;
use App\Models\EventPlatform;
use App\Models\Page;
use App\Models\Track;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function index($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        $partnerCategories = EventPartnerCategory::where('event_app_id', $event->id)->with(['partners'])->get();

        return view('event-website.index', compact('event', 'colors', 'partnerCategories'));
    }

    public function schedule($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        $partnerCategories = EventPartnerCategory::where('event_app_id', $event->id)->with(['partners'])->get();
        $tracks = Track::where('event_app_id', $event->id)->get();
        $enableTracks = eventSettings($event->id)->getValue('enable_tracks', false);
        $eventPlatforms = EventPlatform::where('event_app_id', $event->id)->get();

        return view('event-website.schedule', compact('event', 'colors', 'partnerCategories', 'tracks', 'enableTracks', 'eventPlatforms'));
    }

    public function speakers($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }
        // Sort speakers alphabetically by name
        $event->event_speakers = $event->event_speakers->sortBy('name')->values();
        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        return view('event-website.speakers', compact('event', 'colors'));
    }

    public function sponsors($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();
        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        $partnerCategories = EventPartnerCategory::where('event_app_id', $event->id)->with(['partners'])->get();
        $exhibitors = EventPartner::where('event_app_id', session('event_id'))->where('type', 'exhibitor')->orderBy('company_name', 'asc')->get();

        return view('event-website.sponsors', compact('event', 'colors', 'partnerCategories', 'exhibitors'));
    }
    public function tickets($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));
        $partnerCategories = EventPartnerCategory::where('event_app_id', $event->id)->with(['partners'])->get();

        return view('event-website.tickets', compact('event', 'colors', 'partnerCategories'));
    }

    public function privacypolicy($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));

        return view('event-website.privacy', compact('event', 'colors'));
    }

    public function contactus($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        $colors = eventSettings($event->id)->getValue('website_colors', config('event_website.colors'));

        return view('event-website.contactus', compact('event', 'colors'));
    }

    // public function index($uuid)
    // {
    //     $event = EventApp::where('uuid', $uuid)->first();

    //     if (! $event) {
    //         abort(404);
    //     }

    //     $page = $event->pages()->homePage()->with(['header', 'footer'])->first();

    //     $header = $page->header;
    //     if ($page->default_header) {
    //         $header = $event->headers()->default()->first();
    //     }

    //     $footer = $page->footer;
    //     if ($page->default_footer) {
    //         $footer = $event->footers()->default()->first();
    //     }

    //     if (! $page) {
    //         abort(404);
    //     }

    //     return Inertia::render('Organizer/Events/Website/Page', [
    //         'page' => $page,
    //         'header' => $header,
    //         'footer' => $footer,
    //     ]);
    // }

    // public function page($uuid, $slug)
    // {
    //     $event = EventApp::where('uuid', $uuid)->first();

    //     if (! $event) {
    //         abort(404);
    //     }

    //     $page = $event->pages()
    //         ->where('slug', $slug)
    //         ->published()
    //         ->first();

    //     $header = $page->header;
    //     if ($page->default_header) {
    //         $header = $event->headers()->default()->first();
    //     }

    //     $footer = $page->footer;
    //     if ($page->default_footer) {
    //         $footer = $event->footers()->default()->first();
    //     }

    //     if (! $page) {
    //         abort(404);
    //     }

    //     return Inertia::render('Organizer/Events/Website/Page', [
    //         'page' => $page,
    //         'header' => $header,
    //         'footer' => $footer,
    //     ]);
    // }
}
