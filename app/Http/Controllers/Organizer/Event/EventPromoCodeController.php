<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\PromoCodeRequest;
use App\Models\EventAppTicket;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventPromoCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_tickets')) {
            abort(403);
        }

        $tickets = EventAppTicket::currentEvent()->select(['id as value', 'name as label'])->get();
        $promoCodes = $this->datatable(PromoCode::currentEvent()->with(['tickets']));
        // $promoCodes = $this->datatable(PromoCode::currentEvent()->with(['event', 'tickets']));

        return Inertia::render('Organizer/Events/PromoCodes/Index', compact('promoCodes', 'tickets'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(PromoCodeRequest $request)
    {
        if (! Auth::user()->can('create_tickets')) {
            abort(403);
        }

        $data = $request->validated();
        Log::info($data);
        $promoCode = PromoCode::create($request->validated());
        $promoCode->tickets()->sync($this->transformTickets($data));
        return back()->withSuccess('Promo Code Created Successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PromoCodeRequest $request, PromoCode $promo_code)
    {
        if (! Auth::user()->can('edit_tickets')) {
            abort(403);
        }

        $data = $request->validated();
        $promo_code->update($data);
        $promo_code->tickets()->sync($this->transformTickets($data));
        return back()->withSuccess('Promo Code Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromoCode $promoCode)
    {
        if (! Auth::user()->can('delete_tickets')) {
            abort(403);
        }

        $promoCode->delete();
        return back()->withSuccess('Promo Code Deleted Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_tickets')) {
            abort(403);
        }
        
        $ids = $request->get('ids');

        $request->validate([
            'ids' => 'required|array'
        ]);
        foreach ($ids as $id) {
            PromoCode::find($id)?->delete();
        }
    }

    private function transformTickets($data)
    {
        $temp = [];
        if (array_key_exists('tickets', $data)) {
            $tickets = array_values($data['tickets']);
            foreach ($tickets as $ticket) {
                if (array_key_exists('value', $ticket)) {
                    array_push($temp, $ticket['value']);
                } else {
                    array_push($temp, $ticket['id']);
                }
            }
        }
        return $temp;
    }
}
