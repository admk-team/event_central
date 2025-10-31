<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\RedirectResponse;
use App\Models\Attendee;
use App\Models\User; 
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
        // **** START OF CORRECTION ****

        // Change the function signature from (Attendee $attendee,...) 
        // to ($notifiable,...) to accept any model.
        ResetPassword::createUrlUsing(function ($notifiable, string $token) {
            
            // Check if the model is an Attendee
            if ($notifiable instanceof Attendee) {
                return route("attendee.password.reset", [
                    'eventApp' => $notifiable->event_app_id, 
                    'token' => $token, 
                    'email' => $notifiable->email
                ]);
            }

            // Check if the model is a User (or add other models)
            if ($notifiable instanceof User) {
                // Return the default password reset URL for Users
                return url(route('password.reset', [
                    'token' => $token,
                    'email' => $notifiable->getEmailForPasswordReset(),
                ], false));
            }

            // Default fallback (you can customize this)
             return url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));
        });

        // **** END OF CORRECTION ****


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