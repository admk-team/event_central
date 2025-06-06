<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPartnerRequest;
use App\Models\EventPartner;
use App\Models\EventPartnerCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventPartnerController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_partner')) {
            abort(403);
        }

        $partners = EventPartner::currentEvent()->latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Partners/Index', compact('partners'));
    }

    public function create()
    {
        if (! Auth::user()->can('create_partner')) {
            abort(403);
        }

        $partnerCategories = EventPartnerCategory::currentEvent()->latest()->get();
        return Inertia::render('Organizer/Events/Partners/CreateOrEdit', compact('partnerCategories'));
    }

    public function edit(string $id)
    {
        if (! Auth::user()->can('edit_partner')) {
            abort(403);
        }

        $partnerCategories = EventPartnerCategory::currentEvent()->latest()->get();
        $partner = EventPartner::findOrFail($id);
        return Inertia::render("Organizer/Events/Partners/CreateOrEdit", compact('partner', 'partnerCategories'));
    }


    public function store(EventPartnerRequest $request)
    {
        if (! Auth::user()->can('create_partner')) {
            abort(403);
        }

        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        // store image
        if ($request->hasFile('exhibitor_logo')) {
            $name = uniqid() . '.' . $data['exhibitor_logo']->getClientOriginalExtension();
            $data['exhibitor_logo'] = $data['exhibitor_logo']->storeAs('organizer/partner', $name, 'public');
            // Get the full URL
            $data['exhibitor_logo'] = asset('storage/' . $data['exhibitor_logo']);
        }
        EventPartner::create($data);
        return redirect()->route('organizer.events.partner.index')->withSuccess('success', 'Partner created successfully.');
    }

    public function update(EventPartnerRequest $request, EventPartner $partner)
    {
        if (! Auth::user()->can('edit_partner')) {
            abort(403);
        }

        $data = $request->validated();
        // Handle file upload and delete old image if new image is uploaded
        if ($request->hasFile('exhibitor_logo')) {
            // Delete old image if exists
            if ($partner->exhibitor_logo && Storage::disk('public')->exists($partner->exhibitor_logo)) {
                Storage::disk('public')->delete($partner->exhibitor_logo);
            }

            // Store the new image
            $name = uniqid() . '.' . $data['exhibitor_logo']->getClientOriginalExtension();
            $data['exhibitor_logo'] = $data['exhibitor_logo']->storeAs('organizer/partner', $name, 'public');
            // Get the full URL
            $data['exhibitor_logo'] = asset('storage/' . $data['exhibitor_logo']);
        } else {
            // If no new logo is uploaded, retain the old logo
            $data['exhibitor_logo'] = $partner->exhibitor_logo;
        }

        $partner->update($data);
        return redirect()->route('organizer.events.partner.index')->withSuccess('success', 'Partner updated successfully.');
    }

    public function destroy(EventPartner $partner)
    {
        if (! Auth::user()->can('delete_partner')) {
            abort(403);
        }

        $partner->delete();
        return back()->withSuccess('Deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_partner')) {
            abort(403);
        }

        // dd('tsign');
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventPartner::find($id)?->delete();
        }
        return back()->withSuccess('Deleted successfully.');
    }
}
