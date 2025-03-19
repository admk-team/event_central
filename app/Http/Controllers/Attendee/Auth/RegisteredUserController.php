<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\invite;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('attendees', 'email')->where('event_app_id', $eventApp->id),
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'groupUser' => 'nullable|string'
        ]);

        DB::transaction(function () use ($request, $eventApp) {
            // Register main attendee
            $user = Attendee::create([
                'event_app_id' => $eventApp->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));

            // Handle group users
            if ($request->groupUser) {
                $groupMembers = explode('|', $request->groupUser);

                foreach ($groupMembers as $member) {
                    $details = explode(',', $member);
                    if (count($details) === 2) {
                        $fullName = trim($details[0]);
                        $email = trim($details[1]);

                        $nameParts = explode(' ', $fullName, 2);
                        $firstName = $nameParts[0] ?? '';
                        $lastName = $nameParts[1] ?? '';

                        // Generate a random password for group members
                        $randomPassword = Str::random(10);

                        if (!Attendee::where('email', $email)->where('event_app_id', $eventApp->id)->exists()) {
                            $groupUser = Attendee::create([
                                'event_app_id' => $eventApp->id,
                                'parent_id' => $user->id, // Store parent ID
                                'first_name' => $firstName,
                                'last_name' => $lastName,
                                'email' => $email,
                                'password' => Hash::make($randomPassword),
                            ]);

                            // Store invite entry
                            Invite::create([
                                'invited_by' => $user->id, // Parent user who invited
                                'invite_to' => $groupUser->id, // Group member
                                'accepted' => false, // Default as not accepted yet
                            ]);
                        }
                    }
                }
            }

            Auth::guard('attendee')->login($user);
        });

        return redirect(route('attendee.event.detail.dashboard', [$eventApp]));
    }
}
