<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Models\AttendeeContactForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactFormController extends Controller
{
    public function index()
    {

        if (! Auth::user()->can('view_contact_form')) {
            abort(403);
        }

        $contactForm = $this->datatable(AttendeeContactForm::where('event_id', session('event_id'))->with('attendee'));
        return Inertia::render('Organizer/Events/ContactForm/Index', compact('contactForm'));
    }

    public function destroy(Request $request)
    {

        if (! Auth::user()->can('delete_contact_form')) {
            abort(403);
        }

        AttendeeContactForm::find($request->id)->delete();
        return back()->withSuccess('Contact Form deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_contact_form')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            AttendeeContactForm::find($id)->delete();
        }
        return back()->withSuccess('Contact Forms deleted successfully.');
    }
}
