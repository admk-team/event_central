<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendee $attendee)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $attendee->update($request->all());
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $path = storage_path('app/public/attendee/avatars');
            $request->image->move(storage_path('app/public/attendee/avatars'), $imageName);
            $attendee->avatar = '/attendee-avatar/' . $imageName;
            $attendee->save();
        } else {
            $attendee->avatar = null;
            $attendee->save();
        }
        return back()->withSuccess("Profile Changes saved successfully");
    }
}
