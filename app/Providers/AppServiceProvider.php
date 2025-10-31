<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\RedirectResponse;
use App\Models\Attendee;
use App\Observers\OrganizerAttendeeObserver;
use Illuminate\Auth\Notifications\ResetPassword; 
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (Attendee $attendee, string $token) {
            return route("attendee.password.reset", ['eventApp' => $attendee->event_app_id, 'token' => $token, 'email' => $attendee->email]);
        });

        RedirectResponse::macro("withSuccess", function ($message) {
            return $this->with('messages', [
                [
                    'type' => 'success',
                    'message' => $message,
                ]
            ]);
        });

        RedirectResponse::macro("withError", function ($message) {
            return $this->with('messages', [
                [
                    'type' => 'error',
                    'message' => $message,
                ]
            ]);
        });

        // Attendee::observe(OrganizerAttendeeObserver::class);
    }
}
