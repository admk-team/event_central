<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function import(Request $request)
    {
        try {
            logger($request->data);

            if ($request->importType == 'attendees') {
                foreach ($request->data as $a) {
                    Attendee::create([
                        'event_app_id' => session('event_id'),
                        'name' => $a['name'],
                        'email' => $a['email'],
                        'phone' => $a['phone'],
                        'qr_code' => 'EMPTY',
                    ]);
                }
                return redirect()->route('organizer.events.attendees.index')->withSuccess('Attendees imported successfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Invalid data format.');
        }
    }
}
