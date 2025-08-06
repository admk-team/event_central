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
    public $inviteUrl;
    public $email;
    public $eventapp;
    public function __construct($email, $eventapp, $inviteUrl)
    {
        $this->email = $email;
        $this->eventapp = $eventapp;
        $this->inviteUrl = $inviteUrl;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->email)->send(
            new PrivateInviteMail($this->eventapp, $this->inviteUrl)
        );
    }
}
