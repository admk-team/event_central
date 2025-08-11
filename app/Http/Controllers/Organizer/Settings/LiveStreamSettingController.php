<?php

namespace App\Http\Controllers\Organizer\Settings;

use App\Http\Controllers\Controller;
use App\Models\LiveStreamSetting;
use App\Models\OrganizerPaymentKeys;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LiveStreamSettingController extends Controller
{

    public function index()
    {
        if (! Auth::user()->can('edit_live_stream_settings')) {
            abort(403);
        }

        $settings = LiveStreamSetting::where('organizer_id', auth()->user()->owner_id)->first();

        return Inertia::render("Organizer/LiveStreamSettings/Index", compact('settings'));
    }


    public function update(Request $request)
    {
        if (! Auth::user()->can('edit_live_stream_settings')) {
            abort(403);
        }

        $input = $request->validate([
            'gumlet_api_key' => 'nullable|string',
            'gumlet_live_source_id' => 'nullable|string',
        ]);

        $settings = LiveStreamSetting::where('organizer_id', auth()->user()->owner_id)->first();
        if ($settings) {
            $settings->gumlet_api_key = $input['gumlet_api_key'];
            $settings->gumlet_live_source_id = $input['gumlet_live_source_id'];
            $settings->save();
        } else {
            LiveStreamSetting::create([
                'gumlet_api_key' => $input['gumlet_api_key'],
                'organizer_id' => auth()->user()->owner_id,
                'gumlet_live_source_id' => $input['gumlet_live_source_id'],
            ]);
        }

        return back()->withSuccess('Live Stream settings updated successfully');
    }
}
