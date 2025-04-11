<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPartnerCategoryRequest;
use App\Models\EventPartnerCategory;
use Illuminate\Http\Request;

class EventPartnerCategoryController extends Controller
{
    public function store(EventPartnerCategoryRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        $data['order'] = 1;
        EventPartnerCategory::create($data);
        return back()->withSuccess('Created successfully.');
    }
    public function update(EventPartnerCategoryRequest $request, EventPartnerCategory $partner_category)
    {
        $data = $request->validated();
        $partner_category->update($data);
        return back()->withSuccess('Updated successfully.');
        
    }
    public function destroy(EventPartnerCategory $partner_category){
        $partner_category->delete();
        return back()->withSuccess('Deleted successfully.');
    }
}
