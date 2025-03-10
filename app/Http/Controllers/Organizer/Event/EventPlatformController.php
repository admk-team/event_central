<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPlatformRequest;
use App\Models\EventPartner;
use App\Models\EventPlatform;
use App\Models\PlatForm;
use Illuminate\Http\Request;

class EventPlatformController extends Controller
{
    public function store(EventPlatformRequest $request)
    {
        $data = $request->validated();     
        $data['event_app_id'] = session('event_id');
        EventPlatform::create($data);
        return back();
    }
    
    public function update(EventPlatformRequest $request,EventPlatform $event_platform)
    {
        $data = $request->validated();     
        $data['event_app_id'] = session('event_id');
        $event_platform->update($data);
        return back();
    }

    public function destroy(EventPlatform $event_platform){
      $event_platform->delete();
      return back()->withSucces('Platform deleted successfully!');
     
    }
}
