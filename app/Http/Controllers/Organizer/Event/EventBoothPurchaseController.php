<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventBoothPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventBoothPurchaseController extends Controller
{
    public function index(Request $request, $boothId = null)
    {
        if (! Auth::user()->can('view_event_booth')) {
            abort(403);
        }

        $query = EventBoothPurchase::currentEvent()
            ->with(['booth:id,name,type,number', 'attendee:id,first_name,last_name,email'])
            ->select('id', 'event_app_id', 'event_booth_id', 'attendee_id', 'amount', 'currency', 'status', 'number');
        if ($boothId) {
            $query->where('event_booth_id', $boothId);
        }

        $data = $this->datatable($query)->through(function ($purchase) {
            return [
                'id'       => $purchase->id,
                'booth'    => $purchase->booth?->name ?? '—',
                'type'     => $purchase->booth?->type,
                'attendee' => $purchase->attendee
                    ? trim(($purchase->attendee->first_name ?? '') . ' ' . ($purchase->attendee->last_name ?? ''))
                    : '—',
                'email'    => $purchase->attendee?->email ?? '—',
                'amount'   => $purchase->amount,
                'currency' => $purchase->currency,
                'status'   => $purchase->status,
                'number'   => $purchase->number,
            ];
        });

        return Inertia::render('Organizer/Events/EventBooth/Purchased', [
            'data' => $data,
            'boothId' => $boothId,
        ]);
    }


    public function destroy($id)
    {
        if (! Auth::user()->can('delete_event_booth')) {
            abort(403);
        }
        $purchase = EventBoothPurchase::find($id);
        if ($purchase) {
            $booth = $purchase->booth;

            if ($booth) {
                // Ensure we don't go below 0
                if ($booth->sold_qty > 0) {
                    $booth->decrement('sold_qty');
                }

                // Re-check sold_qty after decrement
                $booth->refresh();

                $booth->status = ($booth->sold_qty >= $booth->total_qty)
                    ? 'soldout'
                    : 'available';

                $booth->save();
            }

            $purchase->delete();
        }

        return back()->withSuccess('Deleted');
    }


    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_event_booth')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            $purchase = EventBoothPurchase::find($id);

            if ($purchase) {
                $booth = $purchase->booth;

                if ($booth) {
                    // Ensure we don't go below 0
                    if ($booth->sold_qty > 0) {
                        $booth->decrement('sold_qty');
                    }

                    // Re-check sold_qty after decrement
                    $booth->refresh();

                    $booth->status = ($booth->sold_qty >= $booth->total_qty)
                        ? 'soldout'
                        : 'available';

                    $booth->save();
                }

                $purchase->delete();
            }
        }

        return back()->withSuccess('Deleted');
    }
}
