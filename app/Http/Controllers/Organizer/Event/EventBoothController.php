<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventBoothRequest;
use App\Jobs\SendBoothAssignmentEmails;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventBooth;
use App\Models\EventBoothPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventBoothController extends Controller
{
    /* ===================== Index ===================== */
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_event_booth')) abort(403);

        // Attendees for the picker
        $attendees = Attendee::currentEvent()
            ->select('id', 'first_name', 'last_name', 'email')
            ->orderBy('first_name')
            ->get()
            ->map(function ($a) {
                $a->name = trim(($a->first_name ?? '') . ' ' . ($a->last_name ?? ''));
                return $a->only('id', 'name', 'email');
            })
            ->values();

        // Booths with assigned attendees (for badges in table)
        $query = EventBooth::currentEvent()
            ->with(['purchases.attendee:id,first_name,last_name,email'])
            ->select('id', 'event_app_id', 'name', 'type', 'description', 'number', 'price', 'status', 'logo', 'total_qty', 'sold_qty');

        $data = $this->datatable($query)->through(function ($booth) {
            $badges = $booth->purchases->map(function ($p) {
                $n = trim(($p->attendee->first_name ?? '') . ' ' . ($p->attendee->last_name ?? ''));
                return ['id' => $p->attendee_id, 'name' => $n ?: ('#' . $p->attendee_id), 'email' => $p->attendee->email];
            })->values();

            return array_merge($booth->toArray(), [
                'attendees_badges' => $badges,
            ]);
        });

        return Inertia::render('Organizer/Events/EventBooth/Index', compact('data', 'attendees'));
    }

    /* ===================== Store ===================== */
    public function store(EventBoothRequest $request)
    {
        if (! Auth::user()->can('create_event_booth')) abort(403);

        $validated                 = $request->validated();
        $validated['event_app_id'] = session('event_id');

        // Pull intended assignments from the form (optional)
        $incomingIds = collect($validated['attendee_ids'] ?? [])->unique()->values();
        unset($validated['attendee_ids'], $validated['status'], $validated['sold_qty']); // derive these

        // Initialize stock
        $validated['total_qty'] = max(1, (int)($validated['total_qty'] ?? 1));
        $validated['sold_qty']  = 0;

        /** @var EventBooth $booth */
        /** @var array<int> $createdIds */
        [$booth, $createdIds] = DB::transaction(function () use ($validated, $incomingIds) {
            $booth = EventBooth::create($validated);

            // Assign what fits into capacity
            $createdIds = $this->assignNew($booth, $incomingIds);

            // Derive status from stock
            $this->applyStatusFromStock($booth);

            return [$booth, $createdIds];
        });

        // Email only newly assigned
        if (!empty($createdIds)) {
            $this->emailNewlyAssigned($booth, $createdIds);
        }

        $this->saveLogo($booth, $request);

        return back()->withSuccess('Created Successfully');
    }

    /* ===================== Update ===================== */
    public function update(EventBoothRequest $request, EventBooth $booth)
    {
        if (! Auth::user()->can('edit_event_booth', $booth)) abort(403);

        $validated   = $request->validated();
        if (!$validated['logo']) {
            unset($validated['logo']);
        }
        $incomingIds = collect($validated['attendee_ids'] ?? [])->unique()->values();
        unset($validated['attendee_ids'], $validated['status'], $validated['sold_qty']); // we manage these

        // Guard: total >= sold
        if (isset($validated['total_qty'])) {
            $newTotal = max(1, (int)$validated['total_qty']);
            if ($booth->sold_qty > $newTotal) {
                return back()->withErrors([
                    'total_qty' => "Total quantity cannot be less than already sold ({$booth->sold_qty}).",
                ])->withInput();
            }
            $validated['total_qty'] = $newTotal;
        }

        /** @var array<int> $newlyCreated */
        $newlyCreated = DB::transaction(function () use ($booth, $validated, $incomingIds) {
            // Refresh + lock while we manipulate stock/assignments
            /** @var EventBooth $b */
            $b = EventBooth::where('id', $booth->id)->lockForUpdate()->firstOrFail();
            $b->fill($validated)->save();

            // Current active assignments
            $existing = $b->purchases()->pluck('attendee_id')->values();

            // Sanitize incoming against this event
            $validIncoming = $this->validAttendees($b->event_app_id, $incomingIds);

            // Compute diffs
            $toRemove = $existing->diff($validIncoming)->values(); // present before, now removed
            $toAdd    = $validIncoming->diff($existing)->values(); // newly added

            // Apply removals (free capacity)
            if ($toRemove->isNotEmpty()) {
                $this->unassignMany($b, $toRemove);
            }

            // Apply additions (consume capacity)
            $newlyCreated = $this->assignNew($b, $toAdd);

            // Status from stock
            $this->applyStatusFromStock($b);

            return $newlyCreated;
        });

        if (!empty($newlyCreated)) {
            $this->emailNewlyAssigned($booth->fresh(), $newlyCreated);
        }

        if ($request->hasFile('logo')) {
            $this->saveLogo($booth, $request);
        }

        return back()->withSuccess('EventBooth Updated successfully.');
    }

    /* ===================================================
     * Helpers (tiny and focused)
     * =================================================== */

    /**
     * Keep only attendees of this event.
     */
    private function validAttendees(int $eventAppId, Collection $ids): Collection
    {
        if ($ids->isEmpty()) return collect();
        return Attendee::where('event_app_id', $eventAppId)
            ->whereIn('id', $ids)
            ->pluck('id')
            ->values();
    }

    /**
     * Recompute status strictly from stock.
     */
    private function applyStatusFromStock(EventBooth $booth): void
    {
        $booth->status = ($booth->sold_qty >= $booth->total_qty) ? 'soldout' : 'available';
        $booth->save();
    }

    /**
     * Assign up to remaining capacity. Returns only IDs that were just created now.
     */
    private function assignNew(EventBooth $booth, Collection $candidateIds): array
    {
        if ($candidateIds->isEmpty()) return [];

        $valid  = $this->validAttendees($booth->event_app_id, $candidateIds);
        if ($valid->isEmpty()) return [];

        // Prevent duplicates within the tx
        $existing = $booth->purchases()->lockForUpdate()->pluck('attendee_id')->values();
        $newIds   = $valid->diff($existing)->values();
        if ($newIds->isEmpty()) return [];

        $remaining = max(0, (int)$booth->total_qty - (int)$booth->sold_qty);
        if ($remaining <= 0) return [];

        $createdIds = [];
        foreach ($newIds->take($remaining) as $attendeeId) {
            $purchase = EventBoothPurchase::firstOrCreate(
                ['event_booth_id' => $booth->id, 'attendee_id' => $attendeeId],
                [
                    'event_app_id'  => $booth->event_app_id,
                    'price'         => (int) $booth->price,
                    'currency'      => 'USD',
                    'status'        => 'paid',
                    'payment_intent_id' => Auth::user()->id ??  null,
                ]
            );

            if ($purchase->wasRecentlyCreated) {
                $booth->increment('sold_qty');
                $createdIds[] = (int) $attendeeId;
            }
        }

        return $createdIds;
    }

    /**
     * Unassign the given attendees: delete rows and decrement sold_qty.
     * (Hard delete for simplicity; switch to soft deletes if you need audit.)
     */
    private function unassignMany(EventBooth $booth, Collection $removeIds): void
    {
        if ($removeIds->isEmpty()) return;

        // Lock purchase set
        $purchases = $booth->purchases()
            ->whereIn('attendee_id', $removeIds)
            ->lockForUpdate()
            ->get();

        foreach ($purchases as $p) {
            $p->delete();
            if ($booth->sold_qty > 0) {
                $booth->decrement('sold_qty');
            }
        }
    }

    /**
     * Queue email(s) for only the new assignments we just created.
     */
    private function emailNewlyAssigned(EventBooth $booth, array $newlyAssignedIds): void
    {
        if (empty($newlyAssignedIds)) return;

        $purchases = $booth->purchases()
            ->whereIn('attendee_id', $newlyAssignedIds)
            ->with('attendee:id,first_name,last_name,email')
            ->get();

        if ($purchases->isEmpty()) return;

        $eventApp = EventApp::find($booth->event_app_id);
        if (! $eventApp) return;

        SendBoothAssignmentEmails::dispatch($booth, $eventApp, $purchases);
    }

    /**
     * Save/replace poster/logo file if present.
     */
    private function saveLogo(EventBooth $booth, Request $request): void
    {
        if ($request->hasFile('logo')) {
            $imageFileName = 'event-booth-' . $booth->id . '.' . $request->logo->extension();
            $path = storage_path('app/public/events/booths');

            if (! is_dir($path)) {
                @mkdir($path, 0775, true);
            }

            if (file_exists($path . '/' . $imageFileName)) {
                @unlink($path . '/' . $imageFileName);
            }

            $request->logo->move($path, $imageFileName);

            $booth->logo = 'events/booths/' . $imageFileName;
            $booth->save();
        }
    }
}
