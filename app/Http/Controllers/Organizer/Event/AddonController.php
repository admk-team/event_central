<?php

namespace App\Http\Controllers\Organizer\Event;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\AddonAttributeOption;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\TicketFeature;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddonController extends Controller
{
    public function index(EventAppTicket $event_app_ticket)
    {
        if (! Auth::user()->can('view_add_on')) {
            abort(403);
        }

        $addons = $this->datatable(
            Addon::with(['attributes.options', 'variants.attributeValues'])->currentEvent()
        );
        $tickets = EventAppTicket::currentEvent()->orderBy('name', 'asc')->get();

        return Inertia::render('Organizer/Events/Addons/Index', compact('addons', 'tickets'));
    }
    public function store(Request $request)
    {
        if (! Auth::user()->can('create_add_on')) {
            abort(403);
        }

        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'event_app_ticket_id' => 'nullable',
            'name' => 'required|max:250',
            'price' => 'required|numeric',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
            'enable_discount' => 'boolean',
            'attributes' => 'nullable',
            'variants' => 'nullable',
            'deletedAttributes' => 'nullable',
            'deletedOptions' => 'nullable',
            'newField' => 'nullable|array',
            'newField.*.input' => 'nullable|string',
        ]);
        $data = $request->all();
        if (!$data['qty_total']) {
            $data['qty_total'] = 0;
        }
        unset($data['attributes']);
        unset($data['variants']);

        $data['extra_fields'] = !empty($request->newField)
            ? json_encode($request->newField)
            : null;


        $addon = Addon::create($data);
        
        $this->createUpdateVariants($addon, $request);

        return back()->withSuccess('Addon Created Successfully');
    }

    public function update(Request $request, Addon $addon)
    {
        if (! Auth::user()->can('edit_add_on')) {
            abort(403);
        }

        $request->validate([
            'organizer_id' => 'required',
            'event_app_id' => 'nullable|numeric',
            'event_app_ticket_id' => 'nullable',
            'name' => 'required|max:250',
            'price' => 'required|numeric',
            'qty_total' => 'required|numeric',
            'qty_sold' => 'nullable|numeric',
            'enable_discount' => 'boolean',
            'newField' => 'nullable|array',
            'newField.*.input' => 'nullable|string',
        ]);
        $data = $request->all();
        if (!$data['qty_total']) {
            $data['qty_total'] = 0;
        }

        $data['extra_fields'] = !empty($request->newField)
            ? json_encode($request->newField)
            : null;


        $addon->update($data);

        $this->createUpdateVariants($addon, $request);

        return back()->withSuccess('Addon Updated Successfully');
    }

    public function destroy(Addon $addon)
    {
        if (! Auth::user()->can('delete_add_on')) {
            abort(403);
        }

        $addon->delete();
        return back()->withSuccess('Addon Deleted Successfully');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_add_on')) {
            abort(403);
        }
        
        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($request->ids as $id) {
            Addon::find($id)?->delete();
        }
        return back()->withSuccess('Selected Addon(s) Deleted Successfully');
    }

    public function getAllAddons($event_app_ticket_id = null)
    {
        $addons = Addon::get();
        return response()->json(['addons' => $addons]);
    }

    public function createUpdateVariants($addon, $request)
    {
        $attributeIndexToIdMap = [];

        // Delete existing attributes and options if they are marked as deleted
        foreach ($request->input('deletedAttributes') ?? [] as $deletedAttributeId) {
            $addon->attributes()->where('id', $deletedAttributeId)->delete();
        }
        AddonAttributeOption::whereIn('id', $request->input('deletedOptions') ?? [])->delete();

        // Create attributes
        foreach ($request->input('attributes') ?? [] as $attributeIndex => $attribute) {
            if (! $attribute['name']) continue;

            $attributeModel = null;
            if (isset($attribute['id'])) {
                $attributeModel = $addon->attributes()->find($attribute['id']);
                if ($attributeModel) {
                    $attributeModel->update([
                        'name' => $attribute['name'],
                    ]);
                }
            } else {
                $attributeModel = $addon->attributes()->create([
                    'name' => $attribute['name'],
                    'type' => 'custom',
                ]);
            }

            $attributeIndexToIdMap[$attributeIndex] = [
                'id' => $attributeModel->id,
                'options' => [],
            ];

            foreach ($attribute['options'] ?? [] as $optionIndex => $option) {
                if (! $option['value']) continue;

                if (isset($option['id'])) {
                    $optionModel = $attributeModel->options()->find($option['id']);
                    if ($optionModel) {
                        $optionModel->update([
                            'value' => $option['value'],
                        ]);
                    }
                } else {
                    $optionModel = $attributeModel->options()->create([
                        'value' => $option['value'],
                    ]);
                }

                $attributeIndexToIdMap[$attributeIndex]['options'][$optionIndex] = $optionModel->id;
            }
        }

        // Delete existing variants if they are marked as deleted
        foreach ($request->input('deletedVariants') ?? [] as $deletedVariantId) {
            $addon->variants()->where('id', $deletedVariantId)->delete();
        }

        // Create or update variants
        foreach ($request->input('variants') ?? [] as $variant) {
            if (! $variant['attribute_values'] || ! count($variant['attribute_values'])) continue;

            $variantData = [
                'price' => $variant['price'] ?? 0,
                'qty' => $variant['qty'] ?? 0,
            ];

            if (isset($variant['id'])) {
                $variantModel = $addon->variants()->find($variant['id']);
                if ($variantModel) {
                    $variantModel->update($variantData);
                }
            } else {
                $variantModel = $addon->variants()->create($variantData);
            }

            foreach ($variant['attribute_values'] as $attributeValue) {
                if (isset($attributeValue['attribute_index']) && isset($attributeValue['option_index'])) {
                    $variantModel->attributeValues()->updateOrCreate([
                        'addon_attribute_id' => $attributeIndexToIdMap[$attributeValue['attribute_index']]['id'],
                        'addon_attribute_option_id' => $attributeIndexToIdMap[$attributeValue['attribute_index']]['options'][$attributeValue['option_index']],
                    ]);
                }
            }
        }
    }
}
