<?php

namespace App\Http\Controllers\Api\v1\Organizer\EventShop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventShop\EventProductRequest;
use App\Models\EventApp;
use App\Models\EventProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Get all products for the current event app
     */
    public function index(EventApp $event)
    {
        if (!Auth::user()->can('view_product')) {
            return response()->json(['status' => false, 'message' => 'Forbidden'], 403);
        }

        $products = EventProduct::where('event_app_id', $event->id)->get();

        return response()->json([
            'status' => true,
            'products' => $products
        ]);
    }

    /**
     * Store a new product
     */
    public function store(EventProductRequest $request, EventApp $event)
    {
        if (!Auth::user()->can('create_products')) {
            return response()->json(['status' => false, 'message' => 'Forbidden'], 403);
        }

        $data = $request->validated();
        $data['event_app_id'] = $event->id;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $data['image'] = $file->store('products', 'public');
        }

        EventProduct::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Product created successfully'
        ]);
    }

    /**
     * Update a product
     */
    public function update(EventProductRequest $request, EventProduct $product, EventApp $event)
    {
        if (!Auth::user()->can('delete_product')) {
            return response()->json(['status' => false, 'message' => 'Forbidden'], 403);
        }
        $data = $request->validated();
        $data['event_app_id'] = $event->id;

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            $data['image'] = $product->image;
        }

        $product->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * Delete a product
     */
    public function destroy(EventProduct $product)
    {
        if (!Auth::user()->can('delete_users')) {
            return response()->json(['status' => false, 'message' => 'Forbidden'], 403);
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
