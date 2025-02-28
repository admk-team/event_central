<?php

namespace App\Http\Controllers\Attendee\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;

class EmailChangeController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'email' => 'required|string|lowercase|email|max:255|unique:' . Attendee::class,
        ]);

        $request->user('attendee')->update([
            'email' => $validated['email'],
        ]);

        return back()->withSuccess("Attendee Email Changed Successfully");
    }
}
