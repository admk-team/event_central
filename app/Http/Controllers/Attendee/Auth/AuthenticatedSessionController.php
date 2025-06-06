<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\AttendeeLoginRequest;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventAppSetting;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(EventApp $eventApp): Response|RedirectResponse
    {
        //Check if registration is public or private then show Login Page with registration button or not
        $event_setting = EventAppSetting::where('event_app_id', $eventApp->id)->where('key', 'registration_private')->first();
        $registration_allowed = ($event_setting && $event_setting->value === 1) ? false : true;
        $eventApp->load(['dates']);
        return Inertia::render('Attendee/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'eventApp' => $eventApp,
            'registration_allowed' => $registration_allowed
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(AttendeeLoginRequest $request, EventApp $eventApp): RedirectResponse
    {
        //Custom logic to login user as attendee may sigunup with different event keeping same email address
        // Laravel default auth guard will not work here

        $user = Attendee::where('event_app_id', $eventApp->id)->where('email', $request->email)->first();
        if ($user) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (Hash::check($credentials['password'], $user->password)) {
                Auth::guard('attendee')->login($user);
                $request->session()->regenerate();
                return redirect()->route('attendee.event.detail.dashboard');
            }
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $eventId = auth('attendee')->user()->event_app_id;
        Auth::guard('attendee')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('attendee.login', [$eventId]));
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
