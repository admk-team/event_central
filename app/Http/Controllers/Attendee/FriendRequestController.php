<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FriendRequestController extends Controller
{
    public function Index()
    {
        return Inertia::render('Attendee/FriendRequest/Index');
    }
}
