<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Jobs\SendPrivateInviteEmail;
use App\Models\EventApp;
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
        $data = $this->datatable(PrivateInvite::currentEvent());

        return Inertia::render('Organizer/Events/PrivateRegistration/Index', ['data' => $data,]);
    }
    public function send(Request $request)
    {
        if (!Auth::user()->can('view_private_registration')) {
            abort(403);
        }

        $validated = $request->validate([
            'emails' => 'required|array',
            'emails.*' => 'email',
        ]);

        $eventAppId = session('event_id');
        $eventApp = EventApp::findOrFail($eventAppId);

        foreach ($validated['emails'] as $email) {
            PrivateInvite::create([
                'event_app_id' => $eventAppId,
                'email' => $email,
            ]);

            // Generate invite URL for this eventApp
            $inviteUrl = route('attendee.register', ['eventApp' => $eventApp->id]);
            // Dispatch job to send email
            SendPrivateInviteEmail::dispatch($email, $eventApp, $inviteUrl);
        }

        return back()->withSuccess('Invitations sent successfully.');
    }
    public function destroy($id)
    {
        if (! Auth::user()->can('delete_private_registration')) {
            abort(403);
        }

        PrivateInvite::find($id)->delete();
        return back()->withSuccess('Deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_private_registration')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            PrivateInvite::find($id)->delete();
        }
        return back()->withSuccess('Deleted successfully.');
    }
}
