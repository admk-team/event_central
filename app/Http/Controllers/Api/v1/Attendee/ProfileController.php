<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\ProfileUpdateRequest;

class ProfileController extends Controller
{
    public function update(ProfileUpdateRequest $request, Attendee $attendee)
    {
        // $imageName = time() . '.' . $request->image->extension();
        // $path = storage_path('app/public/attendee/avatars');

        $input = $request->validated();
        // dd($input);
        $attendee->update($input);

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

        return $this->successMessageResponse("Profile Changes saved successfully", 200);
    }
}
