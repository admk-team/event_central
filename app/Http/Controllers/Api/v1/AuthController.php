<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\User;
use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request, $type)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Determine the model based on type
        if ($type === 'attendee') {
            $userModel = Attendee::class;
        } else {
            $userModel = User::class;
        }

        // Retrieve the user by email
        $user = $userModel::where('email', $credentials['email'])->first();

        // Validate password manually because Sanctum does not support attempt()
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
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
