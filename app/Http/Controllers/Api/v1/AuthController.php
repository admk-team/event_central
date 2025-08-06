<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\User;
use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request, $type)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'event_app_id' => 'nullable',
        ]);

        // Determine the model based on type
        if ($type === 'attendee') {
            $user = Attendee::where('email', $credentials['email'])
                ->when(!empty($credentials['event_app_id']), function ($query) use ($credentials) {
                    $query->where('event_app_id', $credentials['event_app_id']);
                })
                ->first();
            if (!$user) {
                return response()->json([
                    'message' => 'Account does not exist for this event.'
                ], 401);
            }
        } else {
            $user = User::where('email', $credentials['email'])->first();
        }

        // Validate password manually because Sanctum does not support attempt()
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 401);
        }

        $registration_complete = true;

        if ($type === 'attendee') {
            $event = EventApp::findOrFail($user->event_app_id);
            $url = route('organizer.events.website', $event->uuid ?? null);
            $title = str_replace(' ', '-', $event->name ?? null);
            $personal_url = $url . '?link=' . $title . '-' . $event->uuid ?? null;
            $user->personal_url = $personal_url;
            $user->save();

            // Check if custom registration form is enabled and not filled
            $form = $event->form;
            if ($form && $form->status && $form->submissions()->where('attendee_id', $user->id)->count() === 0) {
                $registration_complete = false;
            }
        }

        // Assign role-based ability
        $role = $type === 'attendee' ? 'attendee' : 'user';
        $token = $user->createToken('auth_token', ["role:$role"])->plainTextToken;

        if ($type !== 'attendee') {
            setPermissionsTeamId($user->owner_id);
        }

        return response()->json([
            'user' => $user->toArray(),
            'role' => $role,
            'token' => $token,
            'registration_complete' => $registration_complete,
            ...($type !== 'attendee' ? ['permissions' => $user->getAllPermissions()->pluck('name') ?? []] : []),
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function delete($id, $type)
    {
        // Determine the model based on type
        if ($type === 'attendee') {
            $attendee = Attendee::findOrFail($id);
        } else {
            $attendee = User::findOrFail($id);
        }

        $attendee->tokens()->delete();
        $attendee->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
