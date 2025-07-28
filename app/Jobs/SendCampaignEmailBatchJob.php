<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Attendee;
use App\Models\EventCampaign;
use App\Models\EventEmailTemplate;
use App\Mail\CampaignEmail;
use App\Enums\CampaignStatus;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Bus\Queueable as BusQueueable;

class SendCampaignEmailBatchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, BusQueueable, SerializesModels;

    public $timeout = 300; // 5 minutes
    public $tries = 3;

    private int $rateLimit = 100; // emails per minute
    private int $totalEmails = 0;
    private int $failedEmails = 0;

    public function __construct(
        protected EventCampaign $campaign,
        protected EventEmailTemplate $template,
        // protected $email
    ) {}

    public function handle(): void
    {
        $startTime = microtime(true);

        // Determine recipients
        $contactsQuery = $this->campaign->sent_to;
        $contacts = collect();

        if ($contactsQuery === 'staff') {
            $contacts = User::ofOwner()->select('email')->get();
        } elseif ($contactsQuery === 'attendees') {
            $contacts = Attendee::where('event_app_id', $this->campaign->event_app_id)
                ->select('email')->get();
        }

        if ($contacts->isEmpty()) {
            $this->campaign->update(['status' => 'no_contacts']);
            return;
        }

        // Begin processing
        $this->campaign->update(['status' => 'processing']);

        foreach ($contacts as $contact) {
            $this->processContact($contact);
            $this->rateLimit(1);
        }

        $status = $this->failedEmails > 0
            ? 'sent'
            : 'sent';

        $this->campaign->update(['status' => $status]);

        // Optional: log metrics
        $executionTime = microtime(true) - $startTime;
        // Log::info("Campaign #{$this->campaign->id} finished. Sent: {$this->totalEmails}, Failed: {$this->failedEmails}, Time: {$executionTime}s");
    }

    private function processContact($contact): void
    {
        $this->totalEmails++;
        Log::info($contact->email);
        try {
            Mail::to($contact->email)->send(new CampaignEmail($this->campaign, $this->template));
        } catch (\Exception $e) {
            $this->failedEmails++;
            // Log::error("Failed to send email to {$contact->email}: {$e->getMessage()}");
        }
    }

    private function rateLimit(int $emailsSent): void
    {
        if ($this->rateLimit > 0) {
            $sleepTime = ceil(60 / $this->rateLimit * $emailsSent);
            sleep($sleepTime);
        }
    }

    public function failed(\Exception $exception): void
    {
        $this->campaign->update(['status' => 'failed']);
        // Log::error('Campaign job failed: ' . $exception->getMessage());
    }
}
