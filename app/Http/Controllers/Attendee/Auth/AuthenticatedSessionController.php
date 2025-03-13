<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AttendeeLoginRequest;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Providers\RouteServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(EventApp $eventApp): Response
    {
        return Inertia::render('Attendee/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'eventApp' => $eventApp
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(AttendeeLoginRequest $request, EventApp $eventApp): RedirectResponse
    {
        Log::info($eventApp);
        $request->authenticate();    //Attendee Login Request
        $request->session()->regenerate();
        return redirect()->intended(route('attendee.event.detail.dashboard', [$eventApp->id]));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request, EventApp $eventApp): RedirectResponse
    {
        Auth::guard('attendee')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->intended(route('attendee.login', [$eventApp]));
    }
    public function googleRedirect()
    {
        return Socialite::driver('google')->with([
            'state' => '1'
        ])->redirect();
    }
    public function googleCallback(Request $request)
    {
        $event_id = $request->input('state');
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = Attendee::where('email', $googleUser->email)->first();
        // if (!$user) {
        //     $user = Attendee::create(['name' => $googleUser->name, 'email' => $googleUser->email, 'password' => Hash::make(rand(100000, 999999))]);
        // }

        // Auth::guard('attendee')->login($user);
        return redirect(route('attendee.event.detail.dashboard', [1]));
    }
}
