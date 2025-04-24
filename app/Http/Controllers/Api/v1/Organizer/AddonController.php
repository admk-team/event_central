<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\EventApp;
use Illuminate\Http\Request;

class AddonController extends Controller
{
    public function index(Request $request, EventApp $event)
    {
        $query = Addon::where('event_app_id', $event->id)->withCount('checkins');
        
        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%")
                ->limit(20);
        } else {
            $query->orderBy('name');
        }

        $addons = $query->get();

        return $addons;
    }

    public function scan()
    {
        
    }
}
