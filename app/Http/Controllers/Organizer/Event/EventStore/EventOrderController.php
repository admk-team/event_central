<?php

namespace App\Http\Controllers\Organizer\Event\EventStore;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\Order;
class EventOrderController extends Controller
{
    public function index()
    {
        $orders=  $this->datatable(Order::CurrentEvent());
        return Inertia::render('Organizer/Events/EventStore/Orders/Index', compact('orders'));
    }
}
