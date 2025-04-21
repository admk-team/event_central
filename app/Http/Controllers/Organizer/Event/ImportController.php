<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ImportController extends Controller
{
    public function import(Request $request)
    {
        Log::info($request->all());
        try {
            if ($request->importType == 'attendees') {
                foreach ($request->data as $a) {
                    Attendee::create([
                        'event_app_id' => session('event_id'),
                        'first_name' => $a['name'],
                        'email' => $a['email'],
                        'phone' => $a['phone'],
                        'position' => $a['position'],
                        'location' => $a['location'],
                        'qr_code' => 'EMPTY',
                        'password' => Hash::make('12345678')  // Set Default Password
                    ]);
                }
                return redirect()->route('organizer.events.attendees.index')->withSuccess('Attendees imported successfully. Default password of each attendee is [12345678]');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Invalid data format.');
        }
    }
}
