<?php

namespace App\Jobs;

use App\Mail\SendEventReminderEmail;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventAttendee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Traits\SendsWebPushNotifications;

class SendEventReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, SendsWebPushNotifications;

    protected $eventApp;

    public function __construct(EventApp $eventApp)
    {
        $this->eventApp = $eventApp;
    }

    public function handle(): void
    {
        $attendees = Attendee::where('event_app_id', $this->eventApp->id)->get();

        $startDateObj = optional($this->eventApp->dates()->orderBy('date', 'asc')->first())->date;
        $endDateObj   = optional($this->eventApp->dates()->orderBy('date', 'desc')->first())->date;

        $startDate = $startDateObj ? \Carbon\Carbon::parse($startDateObj)->format('F j, Y') : null;
        $endDate   = $endDateObj ? \Carbon\Carbon::parse($endDateObj)->format('F j, Y') : null;

        foreach ($attendees as $attendee) {
            try {

                // Send Email
                Mail::to($attendee->email)->queue(
                    new SendEventReminderEmail($attendee, $this->eventApp, $startDate, $endDate)
                );

                // Send Push Notification via trait
                $this->sendWebPushNotification(
                    $attendee->id,
                    'Event Reminder',
                    "{$this->eventApp->name} will start at {$startDate}",
                    route('organizer.events.website', $this->eventApp->uuid)
                );
            } catch (\Exception $e) {
            }
        }
    }
}
