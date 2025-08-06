<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\EventPartner;
use App\Models\EventPartnerCategory;
use App\Models\EventPlatform;
use App\Models\Page;
use App\Models\ReferralLink;
use App\Models\Track;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class WebsiteController extends Controller
{
    public function index(Request $request, $uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || !eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

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
        $privateRegister = eventSettings($event->id)->getValue('private_register', false);
        return view('event-website.index', compact('event', 'colors', 'partnerCategories', 'exhibitors', 'privateRegister'));
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
        $privateRegister = eventSettings($event->id)->getValue('private_register', false);

        return view('event-website.schedule', compact('event', 'colors', 'partnerCategories', 'tracks', 'enableTracks', 'eventPlatforms', 'privateRegister'));
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
        $privateRegister = eventSettings($event->id)->getValue('private_register', false);
        
        return view('event-website.speakers', compact('event', 'colors', 'privateRegister'));
    }

    public function sponsors($uuid)
    {
        $data = $this->getEventData($uuid);
        $partnerCategories = EventPartnerCategory::where('event_app_id', $data['event']->id)->with(['partners'])->get();
        $exhibitors = EventPartner::where('event_app_id', $data['event']->id)->where('type', 'sponsor')->orderBy('company_name', 'asc')->get();

        return view('event-website.sponsors', array_merge($data, compact('partnerCategories', 'exhibitors')));
    }

    public function sponsorsSingle($uuid, $id)
    {
        $data = $this->getEventData($uuid);
        $partnerCategories = EventPartnerCategory::where('id', $data['event']->id)->with(['partners' => function ($query) use ($id) {
            $query->where('id', $id);
        }])->get();
        // dd($partnerCategories);
        $partner = EventPartner::where('id', $id)->first();
        return view('event-website.sponsor-single', array_merge($data, compact('partnerCategories', 'partner')));
    }

    public function exhibitors($uuid)
    {
        $data = $this->getEventData($uuid);
        $exhibitors = EventPartner::where('event_app_id', $data['event']->id)->where('type', 'exhibitor')->orderBy('company_name', 'asc')->get();
        return view('event-website.exhibitors', array_merge($data, compact('exhibitors')));
    }

    public function tickets($uuid)
    {
        $data = $this->getEventData($uuid);
        $partnerCategories = EventPartnerCategory::where('event_app_id', $data['event']->id)->with(['partners'])->get();

        return view('event-website.tickets', array_merge($data, compact('partnerCategories')));
    }

    public function privacypolicy($uuid)
    {
        $data = $this->getEventData($uuid);
        return view('event-website.privacy', $data);
    }

    public function contactus($uuid)
    {
        $data = $this->getEventData($uuid);
        return view('event-website.contactus', $data);
    }
    private function getEventData($uuid)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event || ! eventSettings($event->id)->getValue('website_status', false)) {
            abort(404);
        }

        return [
            'event' => $event,
            'colors' => eventSettings($event->id)->getValue('website_colors', config('event_website.colors')),
            'privateRegister' => eventSettings($event->id)->getValue('private_register', false),
        ];
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
