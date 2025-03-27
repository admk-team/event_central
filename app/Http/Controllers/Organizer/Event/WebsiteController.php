<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Page;
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

        return view('website', compact('event'));
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
