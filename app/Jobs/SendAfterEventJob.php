<?php

namespace App\Jobs;

use App\Mail\SendAfterEventEmail;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Traits\SendsWebPushNotifications;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendAfterEventJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, SendsWebPushNotifications;


    protected $eventApp;
    public function __construct(EventApp $eventApp)
    {
        $this->eventApp = $eventApp;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $attendees = Attendee::where('event_app_id', $this->eventApp->id)->get();
        Log::info('Event after job started.');


        $endDateObj = optional($this->eventApp->dates()->orderBy('date', 'desc')->first())->date;
        $endDate    = $endDateObj ? \Carbon\Carbon::parse($endDateObj)->format('F j, Y') : null;
        foreach ($attendees as $attendee) {
            try {
                Log::info("After event Sending to attendee  {$attendee->id}");

                // Send Thank You / Feedback Email
                Mail::to($attendee->email)->queue(
                    new SendAfterEventEmail($attendee, $this->eventApp, $endDate)
                );

                // Send Push Notification
                $this->sendWebPushNotification(
                    $attendee->id,
                    'Thanks for Attending!',
                    "Thank you for joining {$this->eventApp->name}. We’d love your feedback!",
                    route('organizer.events.website', $this->eventApp->uuid)
                );

                Log::info("After-event reminder sent to attendee ID {$attendee->id}");
            } catch (\Exception $e) {
                Log::error("Failed to send after-event reminder to attendee ID {$attendee->id} ({$attendee->email}): " . $e->getMessage());
            }
        }
    }
}
