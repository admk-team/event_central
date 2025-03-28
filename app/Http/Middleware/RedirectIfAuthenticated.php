<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $guards = [];
        //$guards = array_keys(config('auth.guards'));
        // $guards = empty($guards) ? [null] : $guards;
        // Log::info($guards);
        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
        //         return redirect(RouteServiceProvider::getHome());
        //     }
        // }
        if (!$request->isMethod('post')) {
            if (Auth::guard('web')->check()) {
                return redirect(RouteServiceProvider::getHome());
            } else if (Auth::guard('attendee')->check()) {
                return redirect()->route('attendee.event.detail.dashboard');
            }
        }

        return $next($request);
    }
}
