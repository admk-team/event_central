<?php

namespace App\Http\Middleware;

use App\Models\EventApp;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAttendeeRegistrationForm
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $attendee = Auth::guard('attendee')->user();
        $event = EventApp::find($attendee->event_app_id);
<<<<<<< HEAD
        // $form = $event->form;
        // dd($form);
        // $formFilled = $form->submissions()->where('attendee_id', $attendee->id)->count();

        // if ($form->status && !$formFilled) {
        //     return redirect()->route('organizer.events.event-registration-form', $event->uuid);
        // }
=======
        $form = $event->form;

        if ($form && $form->status && $form->submissions()->where('attendee_id', $attendee->id)->count() === 0) {
            return redirect()->route('attendee.event-registration-form', $event->id);
        }
>>>>>>> 5943714c965db71345aa1031174b15c9e3130254

        return $next($request);
    }
}
