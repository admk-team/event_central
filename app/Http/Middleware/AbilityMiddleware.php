<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AbilityMiddleware
{
    public function handle(Request $request, Closure $next, ...$abilities)
    {
        $user = $request->user();

        if (!$user || !$user->currentAccessToken()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if the user has at least one of the abilities
        foreach ($abilities as $ability) {
            if ($user->tokenCan($ability)) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}
