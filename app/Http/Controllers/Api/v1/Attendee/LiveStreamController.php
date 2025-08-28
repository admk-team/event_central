<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;

use App\Models\LiveStream;
use Illuminate\Support\Facades\Auth;

class LiveStreamController extends Controller
{

    public function index()
    {
        $eventAppId = Auth::user()->event_app_id;

        $liveStreams = LiveStream::with(['eventTickets'])
                ->where('event_app_id', $eventAppId)
                ->where('status', '!=', 'completed')
                ->whereHas('eventTickets.sold_tickets.payment', function ($query) {
                    $query->where('attendee_id', Auth::user()->id);
                    $query->where('status', 'paid');
                })->get();

        return response()->json([
            'success' => true,
            'liveStreams' => $liveStreams,
        ],200);

    }

    public function joinLiveStreams($id)
    {
         $eventAppId = Auth::user()->event_app_id;

        $join_live_stream = LiveStream::where('event_app_id',$eventAppId)->findOrFail($id);

        $playbackUrlParts = explode('/', $join_live_stream->playback_url);
        $playbackKey = $playbackUrlParts[count($playbackUrlParts) - 2];
        $playBackURL = "https://play.gumlet.io/embed/live/".$playbackKey;

        return response()->json([
            'success' => true,
            'liveStream' => $join_live_stream,
            'playBackURL' => $playBackURL,
        ],200);
    }
}
