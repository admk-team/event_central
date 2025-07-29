<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\EventApp;
use App\Models\PrayerRequest;
use App\Models\User;

class PrayerRequestSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $eventApp;
    public $prayerRequest;

    public function __construct($user, $eventApp, $prayerRequest)
    {
        $this->user = $user;
        $this->eventApp = $eventApp;
        $this->prayerRequest = $prayerRequest;
    }

    public function build()
    {
        return $this->subject('New Prayer Request Submitted')->view('emails.prayer_request_submitted');
    }
}
