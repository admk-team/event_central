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

        if (! $event) {
            abort(404);
        }

        $page = $event->pages()->published()->first();

        if (! $page) {
            abort(404);
        }

        return Inertia::render('Organizer/Events/Website/Page', [
            'page' => $page,
        ]);
    }

    public function page($uuid, $slug)
    {
        $event = EventApp::where('uuid', $uuid)->first();

        if (! $event) {
            abort(404);
        }

        $page = $event->pages()
            ->where('slug', $slug)
            ->published()
            ->first();

        if (! $page) {
            abort(404);
        }

        return Inertia::render('Organizer/Events/Website/Page', [
            'page' => $page,
        ]);
    }
}
