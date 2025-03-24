<?php

namespace App\Observers;

use App\Models\Attendee;
use Illuminate\Support\Facades\Mail;
use App\Mail\AttendeeRegisteration;

class OrganizerAttendeeObserver
{
    /**
     * Handle the Attendee "created" event.
     */
    public function created(Attendee $attendee): void
    {
        Mail::to($attendee->email)->send(new AttendeeRegisteration($attendee->first_name, $attendee->last_name, "12345678", $attendee->email, $attendee->event_app_id));
    }

    /**
     * Handle the Attendee "updated" event.
     */
    public function updated(Attendee $attendee): void
    {
        //
    }

    /**
     * Handle the Attendee "deleted" event.
     */
    public function deleted(Attendee $attendee): void
    {
        //
    }

    /**
     * Handle the Attendee "restored" event.
     */
    public function restored(Attendee $attendee): void
    {
        //
    }

    /**
     * Handle the Attendee "force deleted" event.
     */
    public function forceDeleted(Attendee $attendee): void
    {
        //
    }
}
