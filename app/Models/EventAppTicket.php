<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class EventAppTicket extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_app_id',
        'name',
        'description',
        'type',
        'original_price',
        'base_price',
        'qty_total',
        'qty_sold',
        'increment_by',
        'increment_rate',
        'increment_type',
        'start_increment',
        'end_increment',
        'show_on_attendee_side',
        'position',
        'bulk_purchase_status',
        'bulk_purchase_discount_type',
        'bulk_purchase_discount_value',
        'bulk_purchase_qty',
        'extra_service_name',
        'extra_services',
        'hide_quantity',
    ];

    protected $casts = [
        'show_on_attendee_side' => 'boolean',
        'extra_services' => 'json',
        'bulk_purchase_discount_type' => 'array',
        'bulk_purchase_discount_value' => 'array',
        'bulk_purchase_qty' => 'array',
    ];

    //Being used by Select2 in Ticket Create/Edit Model
    protected $appends = [
        'selected_sessions',
        'selected_addons',
        'total_revenue',
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function event()
    {
        return $this->belongsTo(EventApp::class, 'event_app_id');
    }

    public function sessions()
    {
        return $this->belongsToMany(EventSession::class, 'session_ticket');
    }

    public function promoCodes()
    {
        return $this->belongsToMany(PromoCode::class, 'promo_code_ticket');
    }

    public function fees()
    {
        return $this->belongsToMany(EventAppFee::class, 'event_app_ticket_fee');
    }

    public function addons()
    {
        return $this->belongsToMany(Addon::class, 'addon_event_app_ticket');
    }

    public function getSelectedSessionsAttribute()
    {
        return $this->sessions()->select(['id as value', 'name as label', 'capacity', 'sync_with_tickets'])->get();
    }

    public function getTotalRevenueAttribute()
    {
        return $this->sold_tickets()->sum('total');
    }

    public function getSelectedAddonsAttribute()
    {
        // Ordering and selecting appended property of model
        // and being used as preselected Select2 Options

        $addons_collection = $this->addons()->with('variants')->orderBy('name')->get();

        return $addons_collection->map(function ($addon) {
            return ['value' => $addon->id, 'label' => $addon->full_name, 'variants' => $addon->variants];
        });
    }

    public function ticketType()
    {
        return $this->belongsTo(EventTicketType::class, 'type');
    }

    public function sold_tickets()
    {
        return $this->hasMany(AttendeePurchasedTickets::class, 'event_app_ticket_id')
            ->whereHas('payment', function ($query) {
                $query->where('status', 'paid');
            });
    }
}
