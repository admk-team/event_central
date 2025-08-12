<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
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
            LiveStream::where('event_app_id', $eventAppId)
                ->where(function ($query) {
                    $query->where('status', '!=', 'created')
                        ->where('status','!=','completed')
                        ->orWhere(function ($q) {
                            $q->where('status', 'created')
                                ->where('start_time', '>', Carbon::now());
                        });
                })
        );

        return Inertia::render('Attendee/LiveStreams/Index', [
            'liveStreams' => $liveStreams,
        ]);
    }

    public function joinLiveStreams($id)
    {
        $join_live_stream = LiveStream::findOrFail($id);

        return Inertia::render('Attendee/LiveStreams/JoinLiveStream', [
            'liveStream' => $join_live_stream
        ]);
    }
}
