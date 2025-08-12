<?php

namespace App\Http\Controllers\Organizer\Event\EventStore;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventShop\EventProductRequest;
use App\Models\EventProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = $this->datatable(EventProduct::CurrentEvent());
        return Inertia::render('Organizer/Events/EventStore/Products/Index', compact('products'));
    }

    public function store(EventProductRequest $request)
    {
        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('products', 'public');
            $data['image'] = $path;
        }
        EventProduct::create($data);
        return back()->withSuccess("Product Created");
    }

    public function update(EventProductRequest $request, EventProduct $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $file = $request->file('image');
            $path = $file->store('products', 'public');
            $data['image'] = $path;
        } else {
            $data['image'] = $product->image;
        }
        $product->update($data);
        return back()->withSuccess('Product Updated');
    }

    public function destroy(EventProduct $product)
    {
        // if (! Auth::user()->can('delete_users')) {
        //     abort(403);
        // }
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return back()->withSuccess('Product Deleted');
    }
}
