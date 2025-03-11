<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManagerStatic as Image;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendee $attendee)
    {
        // $imageName = time() . '.' . $request->image->extension();
        // $path = storage_path('app/public/attendee/avatars');

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $attendee->update($request->all());

        if ($request->hasFile('image')) {
            $imageName = 'attendee-' . $attendee->id . '.' . $request->image->extension();
            $path = storage_path('app/public/attendee/avatars');
            if (file_exists($path . '/' . $imageName)) {
                unlink($path . '/' . $imageName);  //Delete previous file
            }
            $request->image->move(storage_path('app/public/attendee/avatars'), $imageName);
            $attendee->avatar = '/storage/attendee/avatars/' . $imageName;
            $attendee->save();
        } else {
            $attendee->avatar = null;
            $attendee->save();
        }

        return back()->withSuccess("Profile Changes saved successfully");
    }
}
