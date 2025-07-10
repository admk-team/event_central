<?php

namespace App\Jobs;

use App\Models\Attendee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportAttendeeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected int $fromEventId;
    protected int $toEventId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $fromEventId, int $toEventId)
    {
        $this->fromEventId = $fromEventId;
        $this->toEventId = $toEventId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Attendee::where('event_app_id', $this->fromEventId)
            ->chunk(100, function ($attendees) {
                foreach ($attendees as $attendee) {
                    // Check if attendee with the same email already exists in target event
                    $exists = Attendee::where('event_app_id', $this->toEventId)
                        ->where('email', $attendee->email)
                        ->exists();

                    if ($exists) {
                        continue; // Skip if already exists
                    }

                    $new = $attendee->replicate();
                    $new->event_app_id = $this->toEventId;
                    $new->save();
                }
            });
    }
}
