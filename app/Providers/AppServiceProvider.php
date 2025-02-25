<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\RedirectResponse;

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
    }
}
