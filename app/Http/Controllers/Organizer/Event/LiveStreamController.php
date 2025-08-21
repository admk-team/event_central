<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\EventAppTicket;
use App\Models\LiveStream;
use App\Models\LiveStreamSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LiveStreamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_live_streams')) {
            abort(403);
        }

        $liveStreams = $this->datatable(
            LiveStream::with('eventTickets')->where('event_app_id', session('event_id'))
        );
        $eventTickets = EventAppTicket::where('event_app_id',session('event_id'))->get();

        return Inertia::render('Organizer/Events/LiveStreams/Index', [
            'liveStreams' => $liveStreams,
            'eventTickets' => $eventTickets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (! Auth::user()->can('create_live_streams')) {
            abort(403);
        }

        $input = $request->validate([
            'title'    =>  'required|string',
            'resolution' => 'required|string',
            'start_time' => 'nullable',
            'eventTickets' => 'nullable',
        ]);

        $liveStreamSettings = LiveStreamSetting::where('organizer_id', Auth::user()->owner_id)->first();

        if (! $liveStreamSettings?->gumlet_api_key) {
            return back()->withError("Please add gumlet api key in live stream settings");
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $liveStreamSettings?->gumlet_api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'accept' => 'application/json',
        ])->post("https://api.gumlet.com/v1/video/live/assets", [
            'live_source_id' => $liveStreamSettings?->gumlet_live_source_id,
            "resolution" => $input['resolution'],
        ]);

        $responseOutput = json_decode($response->getBody(), true);

        if (isset($responseOutput['error'])) {
            return redirect()->back()->withError($responseOutput['error']['message']);
        }

        $urlforkey = $responseOutput['stream_url'];
        $partsofkey = explode("app/", $urlforkey);
        $extractedString = isset($partsofkey[1]) ? $partsofkey[1] : null;

        $url = $responseOutput['stream_url'];
        $parts = explode('/app', $url);
        $cleaned_url = $parts[0] . '/app';

        LiveStream::create([
            'title' => $input['title'],
            'event_app_id' => session('event_id'),
            'status' => 'created',
            'stream_key' => $extractedString,
            'live_asset_id' => $responseOutput['live_asset_id'],
            'live_video_source_id' => $responseOutput['live_video_source_id'],
            'resolution' => $input['resolution'],
            'stream_url' => $cleaned_url,
            'playback_url' => $responseOutput['output']['playback_url'],
            'start_time' => $input['start_time'],
            'event_ticket_id' => $input['eventTickets'],
        ]);

        return back()->withSuccess("Created");
    }

    /**
     * Update
     */
    public function update(Request $request, LiveStream $liveStream)
    {
        if (! Auth::user()->can('edit_live_streams')) {
            abort(403);
        }

        $input = $request->validate([
            'title'    =>  'required|string',
            'start_time' => 'nullable',
            'eventTickets' => 'nullable',
        ]);

        $liveStream->title = $input['title'];
        $liveStream->start_time = $input['start_time'];
        $liveStream->event_ticket_id = $input['eventTickets'];
        $liveStream->save();

        return back()->withSuccess("Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (! Auth::user()->can('delete_live_streams')) {
            abort(403);
        }

        $stream = LiveStream::findOrFail($id);

        $liveStreamSettings = LiveStreamSetting::where('organizer_id', Auth::user()->owner_id)->first();

        if (! $liveStreamSettings?->gumlet_api_key) {
            return back()->withError("Please add gumlet api key in live stream settings");
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $liveStreamSettings?->gumlet_api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'accept' => 'application/json',
        ])->delete("https://api.gumlet.com/v1/video/live/assets/" . $stream->live_asset_id);

        $responseOutput = json_decode($response->getBody(), true);
        if (isset($responseOutput['error'])) {
            return back()->withError($responseOutput['error']['message']);
        }

        DB::transaction(function () use ($stream) {
            $stream->delete();
        }, 2);

        return back()->withSuccess("Deleted");
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_live_streams')) {
            abort(403);
        }

        $liveStreamSettings = LiveStreamSetting::where('organizer_id', Auth::user()->owner_id)->first();

        if (! $liveStreamSettings?->gumlet_api_key) {
            return back()->withError("Please add gumlet api key in live stream settings");
        }

        foreach ($request->ids as $id) {
            $stream = LiveStream::findOrFail($id);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $liveStreamSettings?->gumlet_api_key,
                'accept' => 'application/json',
                'content-type' => 'application/json',
                'accept' => 'application/json',
            ])->delete("https://api.gumlet.com/v1/video/live/assets/" . $stream->live_asset_id);

            $responseOutput = json_decode($response->getBody(), true);
            if (isset($responseOutput['error'])) {
                return back()->withError($responseOutput['error']['message']);
            }

            DB::transaction(function () use ($stream) {
                $stream->delete();
            }, 2);
        }

        return back()->withSuccess('Deleted');
    }

    public function status(string $id)
    {
        if (! Auth::user()->can('edit_live_streams')) {
            abort(403);
        }

        $stream = LiveStream::findOrFail($id);

        $liveStreamSettings = LiveStreamSetting::where('organizer_id', Auth::user()->owner_id)->first();

        if (! $liveStreamSettings?->gumlet_api_key) {
            return back()->withError("Please add gumlet api key in live stream settings");
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $liveStreamSettings?->gumlet_api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post("https://api.gumlet.com/v1/video/live/assets/" . $stream->live_asset_id . "/complete");

        $stream->update(['status' => 'completed']);

        return back()->withSuccess("Status changed");
    }

    public function startStream(Request $request)
    {
        if (! Auth::user()->can('edit_live_streams')) {
            abort(403);
        }

        $Id = $request->input('id');

        $livestream = LiveStream::where('id', $Id)->first();

        $liveStreamSettings = LiveStreamSetting::where('organizer_id', Auth::user()->owner_id)->first();

        if (! $liveStreamSettings?->gumlet_api_key) {
            return back()->withError("Please add gumlet api key in live stream settings");
        }

        if ($livestream) {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $liveStreamSettings?->gumlet_api_key,
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ])->post("https://api.gumlet.com/v1/video/live/assets/" . $livestream->live_asset_id. "/start");
            $livestream->status = 'preparing';
            $livestream->save();

            return back()->withSuccess('Livestream started');
        }

        return back()->withError('Livestream not found');
    }
}
