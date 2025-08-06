<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\PrivateInvite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PrivateRegistrationViaEmailController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_private_registration')) {
            abort(403);
        }
        $invitedEmails = PrivateInvite::currentEvent()->get();

        return Inertia::render('Organizer/Events/PrivateRegistration/Index', [
            'invitedEmails' => $invitedEmails,
        ]);
    }
    public function send(Request $request)
    {
        if (!Auth::user()->can('manage_private_registration')) {
            abort(403);
        }

        $validated = $request->validate([
            'emails' => 'required|array',
            'emails.*' => 'email',
        ]);

        foreach ($validated['emails'] as $email) {
            PrivateInvite::firstOrCreate([
                'event_app_id' => session('event_id'),
                'email' => $email,
            ]);
        }

        return back()->withSuccess('Invitations sent successfully.');
    }
}
