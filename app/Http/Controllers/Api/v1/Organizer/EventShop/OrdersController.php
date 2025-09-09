<?php

namespace App\Http\Controllers\Api\v1\Organizer\EventShop;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrdersController extends Controller
{
    /**
     * Get all orders for the current event with user and product details
     */
    public function index(EventApp $event)
    {
        if (!Auth::user()->can('view_orders')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden'
            ], 403);
        }

        $orders = Order::where('event_app_id', $event->id)
            ->with(['user', 'items.product'])
            ->get();

        return response()->json([
            'status' => true,
            'orders' => $orders
        ]);
    }

    /**
     * Delete a specific order
     */
    public function destroy(Order $order)
    {
        if (!Auth::user()->can('delete_orders')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden'
            ], 403);
        }

        $order->delete();

        return response()->json([
            'status' => true,
            'message' => 'Order deleted successfully'
        ]);
    }
}
