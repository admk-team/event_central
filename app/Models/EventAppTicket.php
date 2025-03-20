<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EventAppTicket extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'type',
        'base_price',
        'addon_features',
        'event_app_id',

        'increment_by',
        'increment_rate',
        'increment_type',
        'start_increment',
        'end_increment',
    ];

    protected $appends = ['selected_sessions', 'all_features'];

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

    public function features()
    {
        return $this->belongsToMany(TicketFeature::class, 'feature_ticket');
    }

    public function getAllFeaturesAttribute()
    {
        if ($this->id) {
            return  DB::select("select f.id, f.organizer_id, f.event_app_id, f.name,
            selected.event_app_ticket_id as selected from ticket_features As f left join
            feature_ticket As selected on f.id = selected.ticket_feature_id and selected.event_app_ticket_id = " . $this->id . " order by selected desc");
        } else {
            return  DB::select("select f.id, f.organizer_id, f.event_app_id, f.name,
            selected.event_app_ticket_id as selected from ticket_features As f left join
            feature_ticket As selected on f.id = selected.ticket_feature_id");
        }
    }

    public function getSelectedSessionsAttribute()
    {
        return $this->sessions()->select(['id as value', 'name as label'])->get();
    }
}
