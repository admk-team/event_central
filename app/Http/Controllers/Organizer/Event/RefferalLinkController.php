<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\RefferalLinkRequest;
use App\Models\EventApp;
use App\Models\ReferralLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RefferalLinkController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_referral_link')) {
            abort(403);
        }
    
        $data = $this->datatable(
        ReferralLink::currentEvent()->withCount(['attendees as successful']));
        return Inertia::render('Organizer/Events/RefferalLink/Index', compact('data'));
    }
    public function store(RefferalLinkRequest $request)
    {
        if (! Auth::user()->can('create_referral_link')) {
            abort(403);
        }
        $data = null;
        $validatedData = $request->validated();
        $currentEvent = EventApp::find(session('event_id'));
        $url = route('organizer.events.website', $currentEvent->uuid);
        if ($url) {
            // Generate random code and update the validated data
            $code = Str::random(32);
            $validatedData['code'] = $code;
            $validatedData['event_app_id'] = session('event_id');
            // Remove spaces from the URL and concatenate the app URL, link, and code
            $title = str_replace(' ', '-', $validatedData['url']);
            $validatedData['url'] = $url . '?link=' . $title . '-' . $validatedData['code'];
    
            // Create the PartnerLink record
            $data = ReferralLink::create($validatedData);
        }
    
        // Check if the data is successfully created
        if ($data) {
            // Return success response
            return back()->withSuccess('Created Successfully');
        } else {
            // Return error response if app domain URL does not exist
            return $this->errorResponse(__('Not created'), 422);
        }
    }

    public function destroy(ReferralLink $refferal_link)
    {
        if (! Auth::user()->can('delete_referral_link')) {
            abort(403);
        }

        if (in_array($refferal_link->id, [Auth::id(), 1])) {
            return back()->withError('This user cannot be deleted');
        }

        $refferal_link->delete();

        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {   
        if (! Auth::user()->can('delete_referral_link')) {
            abort(403);
        }
        
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            ReferralLink::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
}
