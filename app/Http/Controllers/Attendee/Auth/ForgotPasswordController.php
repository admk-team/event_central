<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventApp;
use App\Models\Attendee; // Farz hai ke aapka model 'Attendee' hai
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    
    public function showLinkRequestForm(Request $request, EventApp $eventApp)
    {
        return Inertia::render('Attendee/Auth/ForgotPassword', [
            'eventApp' => $eventApp->load('dates'),
        ]);
    }

    public function sendResetLinkEmail(Request $request, EventApp $eventApp)
    {
        
        // dd("hello");
        $request->validate(['email' => 'required|email']);
        // dd($eventApp);

        // Pehle check karein ke is event ke liye is email ka attendee hai bhi ya nahi
        $attendee = Attendee::where('email', $request->email)
                            ->where('event_app_id', $eventApp->id)
                            ->first();

        // Agar attendee nahi milta...
        if (!$attendee) {
            return back()->withErrors(['email' => 'No attendee was found with this email address for this event.']);
        }
        // dd($attendee);

        // 'attendees' broker ka istemal karke reset link bhejain
        $status = Password::broker('attendees')->sendResetLink(
            $request->only('email')
        );
        // dd($status);

        // Jawab wapas React page ko bhejain
        return $status == Password::RESET_LINK_SENT
                    ? back()->with(['status' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    }
}