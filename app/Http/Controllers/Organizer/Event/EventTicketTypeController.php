<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventTicketTypeRequest;
use App\Models\EventTicketType;
use Illuminate\Http\Request;

class EventTicketTypeController extends Controller
{
    public function store(EventTicketTypeRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        EventTicketType::create($data);
        return back()->withSuccess('Created successfully.');
    }
    public function update(EventTicketTypeRequest $request, EventTicketType $tickets_type)
    {
        $data = $request->validated();
        $tickets_type->update($data);
        return back()->withSuccess('Updated successfully.');
        
    }
    public function destroy(EventTicketType $tickets_type){
        $tickets_type->delete();
        return back()->withSuccess('Deleted successfully.');
    }
}
