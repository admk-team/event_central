<?php

namespace App\Http\Middleware;

use App\Models\EventApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'events' => EventApp::ofOwner()->select('id', 'name', 'logo', 'created_at')->latest()->take(5)->get(),
            'currentEvent' => EventApp::find(session('event_id') ?? Auth::guard('attendee')->user()?->event_app_id) ?? null,
            'messages' => fn() => session()->get('messages') ?? [],
            'permissions' => function () {
                if (Auth::guard('web')->check('attendee')) {
                    return Auth::user()?->getAllPermissions()->pluck('name') ?? [];
                } else if (Auth::guard('attendee')->check()) {
                    return [];
                }
            }
        ];
    }
}
