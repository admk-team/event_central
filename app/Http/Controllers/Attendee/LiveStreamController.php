<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\AttendeePayment;
use App\Models\AttendeePurchasedTickets;
use Illuminate\Http\Request;
use App\Models\LiveStream;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class LiveStreamController extends Controller
{
    public function index()
    {
        $eventAppId = Auth::user()->event_app_id;

        $liveStreams = $this->datatable(
            LiveStream::with('eventTickets')
                ->where('event_app_id', $eventAppId)
                ->where('status', '!=', 'completed')
                ->whereHas('eventTickets.sold_tickets.payment', function ($query) {
                    $query->where('attendee_id', Auth::user()->id);
                    $query->where('status', 'paid');
                })
        );
        return Inertia::render('Attendee/LiveStreams/Index', [
            'liveStreams' => $liveStreams,
        ]);
    }

    public function joinLiveStreams($id)
    {
        $eventAppId = Auth::user()->event_app_id;

        $join_live_stream = LiveStream::where('event_app_id',$eventAppId)->findOrFail($id);

        $playbackUrlParts = explode('/', $join_live_stream->playback_url);
        $playbackKey = $playbackUrlParts[count($playbackUrlParts) - 2];
        $playbackKey = "https://play.gumlet.io/embed/live/".$playbackKey;

        return Inertia::render('Attendee/LiveStreams/JoinLiveStream', [
            'liveStream' => $join_live_stream,
            'playBackKey' => $playbackKey,
        ]);
    }
}
