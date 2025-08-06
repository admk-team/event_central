<?php

namespace App\Http\Middleware;

use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'messages' => fn() => session()->get('messages') ?? [],
            ...$this->data(),
        ];
    }

    protected function adminData(): array
    {
        return [
            'permissions' => function () {
                return Auth::user()?->getAllPermissions()->pluck('name') ?? [];
            }
        ];
    }

    protected function organizerData(): array
    {
        return [
            'events' => EventApp::ofOwner()->select('id', 'name', 'logo', 'created_at')->latest()->take(5)->get(),
            'currentEvent' => Cache::remember("current_event_" . Auth::id(), now()->addMinutes(10), function () {
                return EventApp::with('dates')->find(session('event_id')) ?? null;
            }),
            'permissions' => function () {
                return array_filter(
                    Auth::user()?->getAllPermissions()->pluck('name')->toArray() ?? [],
                    function ($permission) {
                        if(!session('event_id')){
                            return true;
                        }
                        return $permission !== 'view_private_registration' || eventSettings()->getValue('private_register', false);
                    }
                );
            }
        ];
    }

    protected function attendeeData(): array
    {
        return [
            'currentEvent' => EventApp::with(['dates' => function ($query) {
                $query->orderBy('date', 'asc');
            }])->find(Auth::guard('attendee')->user()?->event_app_id) ?? null,
        ];
    }

    protected function guestData(): array
    {
        return [];
    }

    protected function data(): array
    {
        if (Auth::guard('web')->check()) {
            if (Auth::user()->role === 'admin') {
                return $this->adminData();
            } else {
                return $this->organizerData();
            }
        } else if (Auth::guard('attendee')) {
            return $this->attendeeData();
        } else {
            return $this->guestData();
        }
    }
}
