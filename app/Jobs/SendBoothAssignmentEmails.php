<?php

namespace App\Jobs;

use App\Models\EventApp;
use App\Models\EventBooth;
use App\Models\Attendee;
use App\Mail\EventSponsorshipAwardedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBoothAssignmentEmails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected EventBooth $booth;
    protected EventApp $eventApp;
    protected $purchases; // Collection of purchases with attendees eager loaded

    /**
     * Create a new job instance.
     */
    public function __construct(EventBooth $booth, EventApp $eventApp, $purchases)
    {
        $this->booth = $booth;
        $this->eventApp = $eventApp;
        $this->purchases = $purchases;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->purchases as $purchase) {
            $attendee = $purchase->attendee;
            if ($attendee && $attendee->email) {
                Mail::to($attendee->email)->send(
                    new EventSponsorshipAwardedMail($this->eventApp, $this->booth, $attendee)
                );
            }
        }
    }
}
