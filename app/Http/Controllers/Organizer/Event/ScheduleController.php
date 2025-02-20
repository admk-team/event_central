<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $schedule=EventSession::latest()->paginate($request->per_page ?? 10);
        return Inertia::render('Organizer/Events/Schedule/Index',compact('schedule'));
    }

    public function create(){
        return inertia::render('Organizer/Events/Schedule/Index');
    }
}
