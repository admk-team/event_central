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
        $form = $event->form;

        if ($form && $form->status && $form->submissions()->where('attendee_id', $attendee->id)->count() === 0) {
            return redirect()->route('attendee.event-registration-form', $event->id);
        }

        return $next($request);
    }
}
