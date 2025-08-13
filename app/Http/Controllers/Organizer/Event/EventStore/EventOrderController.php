<?php

namespace App\Http\Controllers\Organizer\Event\EventStore;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\EventApp;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class EventOrderController extends Controller
{
    public function index()
    {
        if (! Auth::user()->can('view_orders')) {
            abort(403);
        }
        $orders =  $this->datatable(Order::CurrentEvent()->with('user', 'items.product'));
        return Inertia::render('Organizer/Events/EventStore/Orders/Index', compact('orders'));
    }
    public function destroy(Order $order)
    {
        if (! Auth::user()->can('delete_orders')) {
            abort(403);
        }
        $order->delete();
        return back()->withSuccess('Order Deleted');
    }
}
