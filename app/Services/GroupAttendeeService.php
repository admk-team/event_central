<?php

namespace App\Services;


use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GroupAttendeeService
{
    public function createGroupAttendees(array $emails, Attendee $parent, EventApp $eventApp, ?string $referralLink, string $personalUrl): void
    {
        $emails = array_filter(array_map('trim', $emails));

        foreach ($emails as $email) {
            if (Attendee::where('event_app_id', $eventApp->id)->where('email', $email)->exists()) {
                continue;
            }

            $first_name = Str::random(5);
            $last_name = Str::random(4);
            $password = Str::random(8);

            Attendee::create([
                'event_app_id' => $eventApp->id,
                'parent_id' => $parent->id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'position' => $parent->position,
                'location' => $parent->location,
                'email' => strtolower($email),
                'password' => Hash::make($password),
                'referral_link' => $referralLink,
                'personal_url' => $personalUrl,
            ]);

            // Optional: Email password to group attendee
        }
    }
}
