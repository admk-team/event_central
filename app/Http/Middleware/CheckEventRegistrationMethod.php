<?php

namespace App\Http\Middleware;

use App\Models\EventApp;
use App\Models\EventAppSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Exceptions\InvalidSignatureException;

class CheckEventRegistrationMethod
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $event_setting = EventAppSetting::where('event_app_id', $request->route()->parameter('eventApp')->id)->where('key', 'registration_private')->first();
        // Log::info($event_setting);

        if ($event_setting && $event_setting->value === 1) {
            if (! $request->hasValidSignature()) {
                abort(403, 'Invalid Registration Link');
            }
        }

        return $next($request);
    }
}
