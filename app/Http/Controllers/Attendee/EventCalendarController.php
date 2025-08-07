<?php

namespace App\Http\Controllers\Attendee;

use Inertia\Inertia;
use DateTimeImmutable;
use App\Models\EventApp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Eluceo\iCal\Domain\Entity\Event;
use Illuminate\Support\Facades\Auth;
use Eluceo\iCal\Domain\Entity\Calendar;
use Illuminate\Support\Facades\Response;
use Eluceo\iCal\Domain\ValueObject\DateTime;
use Eluceo\iCal\Domain\ValueObject\TimeSpan;
use Eluceo\iCal\Presentation\Factory\CalendarFactory;

class EventCalendarController extends Controller
{
    public function index()
    {
        $events = EventApp::find(Auth::user()->event_app_id);
        $events->load(['event_sessions.eventSpeakers', 'event_sessions.eventPlatform', 'dates']);
        return Inertia::render('Attendee/Calendar/Index', compact([
            'events',
        ]));
    }

    public function downloadIcs(EventApp $eventApp)
    {
        $lasteventDate = $eventApp->dates()->orderBy('date', 'desc')->get();
        $event = new Event();
        $event->setSummary($eventApp->name);
        $event->setDescription($eventApp->description);
        $timezone = new \DateTimeZone('America/New_York'); // Change if needed
        $event->setOccurrence(
            new TimeSpan(
                new DateTime(new DateTimeImmutable($eventApp->start_date, $timezone), true),
                new DateTime(new DateTimeImmutable($lasteventDate[0]->date, $timezone), true)
            )
        );

        $calendar = new Calendar([$event]);

        $componentFactory = new CalendarFactory();
        $calendarComponent = $componentFactory->createCalendar($calendar);

        return Response::make($calendarComponent, 200, [
            'Content-Type' => 'text/calendar',
            'Content-Disposition' => 'attachment; filename="event.ics"',
        ]);
    }
}
