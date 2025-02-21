<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPartnerRequest;
use App\Models\EventPartner;
use App\Models\EventPartnerCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventPartnerController extends Controller
{
    public function index(Request $request)
    {
        $partners = EventPartner::currentEvent()->latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Partners/Index', compact('partners'));
    }
    public function create()
    {
        $partnerCategories = EventPartnerCategory::currentEvent()->latest()->get();
        return Inertia::render('Organizer/Events/Partners/CreateOrEdit', compact('partnerCategories'));
    }

    public function edit(string $id)
    {
        $partnerCategories = EventPartnerCategory::currentEvent()->latest()->get();
        $partner = EventPartner::findOrFail($id);
        return Inertia::render("Organizer/Events/Partners/CreateOrEdit", compact('partner'));
    }


    public function store(EventPartnerRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        EventPartner::create($data);
        return back();
    }

    public function update(EventPartnerRequest $request, EventPartner $partner)
    {
        $data = $request->validated();
        $partner->update($data);
        return back();
    }

    public function destroy(EventPartner $partner)
    {
        $partner->delete();
        return back();
    }

    public function destroyMany(Request $request)
    {
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            EventPartner::find($id)?->delete();
        }
    }
}
