<?php

namespace App\Jobs;

use App\Mail\PrivateInviteMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPrivateInviteEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
  public $email, $eventApp, $inviteUrl, $startDate, $endDate;

    public function __construct($email, $eventApp, $inviteUrl, $startDate, $endDate)
    {
        $this->email = $email;
        $this->eventApp = $eventApp;
        $this->inviteUrl = $inviteUrl;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function handle()
    {
        Mail::to($this->email)->send(new PrivateInviteMail(
            $this->eventApp,
            $this->inviteUrl,
            $this->startDate,
            $this->endDate
        ));
    }
}
