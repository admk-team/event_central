<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\EventApp;
use App\Models\User;
use App\Policies\EventPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [];

    public function register()
    {
        Gate::before(function (User $user, string $ability, mixed $arguments) {
            if ($user->hasRole('superadmin') || $user->hasRole('owner')) {
                return true;
            }

            if (! isset($arguments[0])) {
                return null;
            }

            if (! $user->hasPermissionTo($ability)) {
                return false;
            }
            
            $model = $arguments[0];

            if (! method_exists($model, 'canBeAccessedBy')) {
                return true;
            }

            return $model->canBeAccessedBy($user) || $model->canBeAccessedBy($user->roles[0]);
        });
    }

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

    }
}
