<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomMenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Organizer/Events/CustomeMenu/Index');
    }
}
