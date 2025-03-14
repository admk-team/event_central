<?php

namespace App\Http\Controllers\Organizer\Event\Settings;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationFormSettingsController extends Controller
{
    public function index()
    {
        $currentEvent = EventApp::find(session('event_id'));

        $this->createDefaults($currentEvent);

        return Inertia::render("Organizer/Events/Settings/RegistrationForm/Index", [
            'status' => eventSettings()->getValue('website_status', false),
            'url' => route('organizer.events.website', $currentEvent->uuid),
            'headers' => $this->datatable(Header::where('event_app_id', session('event_id'))),
            'pages' => $this->datatable(Page::where('event_app_id', session('event_id'))),
            'footers' => $this->datatable(Footer::where('event_app_id', session('event_id'))),
            'homePageSelected' => $currentEvent->pages()->homePage()->count() !== 0,
        ]);
    }
}
