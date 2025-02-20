<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPartnerRequest;
use App\Models\EventPartner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventPartnerController extends Controller
{
    public function index(Request $request)
    {
        $partners=EventPartner::currentEvent()->latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Partners/Index',compact('partners'));
    }
    public function create()
    {
        return Inertia::render('Organizer/Events/Partners/CreateOrEdit');
    }


    public function store(EventPartnerRequest $request){
        $data = $request->validated();

        $data['event_app_id'] = session('event_id');
        EventPartner::create($data);
        return back();
    }
}
