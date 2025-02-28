<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(EventApp $eventApp): Response
    {
        return Inertia::render('Attendee/Auth/Register', compact('eventApp'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, EventApp $eventApp): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Attendee::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Attendee::create([
            'event_app_id' => $eventApp->id,
            'event_pass' => 6,     // Todo : Required to be changed after discussion with team
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => 'test',      // Need to be nullable ->Required to be changed after discussion with team
            'phone' => 'test',      // Need to be nullable ->Required to be changed after discussion with team
            'qr_code' => 'test',      // Need to be nullable ->Required to be changed after discussion with team
        ]);

        event(new Registered($user));

        Auth::guard('attendee')->login($user);

        return redirect(route('attendee.event.detail.dashboard', [$eventApp]));
    }
}
