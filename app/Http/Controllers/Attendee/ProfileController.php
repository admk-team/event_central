<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\ProfileUpdateRequest;
use App\Models\Attendee;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, Attendee $attendee)
    {

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

        return back()->withSuccess("Profile Changes Updated Successfully");
    }
}
