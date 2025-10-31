<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventApp;
use App\Models\Attendee; // <-- Yahan 'Attendee' model istemal karein
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Inertia\Inertia; // <-- Inertia ka istemal form dikhane ke liye

class ResetPasswordController extends Controller
{
    /**
     * Naya password set karne ka form dikhayein.
     * Yeh 'attendee.password.reset' route (GET) se call hoga.
     */
    public function create(Request $request, EventApp $eventApp, $token)
    {
        // Hum Inertia ka istemal kar rahe hain
        return Inertia::render('Attendee/Auth/ResetPassword', [
            'eventApp' => $eventApp->load('dates'),
            'token' => $token,
            'email' => $request->email, // Email ko URL query se lein
        ]);
        
    }

    /**
     * Naye password ko handle aur save karein.
     * Yeh 'attendee.password.store' route (POST) se call hoga.
     * * [FIX] Humne method ka naam 'update' se 'store' kar diya hai
     */
    public function store(Request $request, EventApp $eventApp)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Pehle check karein ke yeh attendee is event ka hissa hai
        $attendeeExists = Attendee::where('email', $request->email)
                                ->where('event_app_id', $eventApp->id)
                                ->first();

        if (!$attendeeExists->exists()) {
            return back()->withErrors(['email' => 'Is event ke liye is email address ke sath koi attendee nahi mila.']);
        }

        // 'attendees' broker ka istemal karke password reset karein
        $status = Password::broker('attendees')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            
            // SABSE ZAROORI BADLAAV: Yahan 'User' ki jagah 'Attendee' istemal karein
            function (Attendee $attendee, string $password) use ($attendeeExists) { 
                $attendeeExists->forceFill([
                    'password' => Hash::make($password)
                ]);

                $attendeeExists->save();
            }
        );

        // Kamyabi par, 'attendee.login' route par redirect karein
        return $status == Password::PASSWORD_RESET
            ? redirect()->route('attendee.login', ['eventApp' => $eventApp->id])->with('status', __($status))
            : back()->withErrors(['email' => __($status)]); // Error wapas form ko bhejain
    }
}

