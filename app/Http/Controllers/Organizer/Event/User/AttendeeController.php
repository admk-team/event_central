<?php

namespace App\Http\Controllers\Organizer\Event\User;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Attendee;
use App\Models\EventApp;
use App\Models\EventSession;
use Illuminate\Http\Request;
use App\Models\EventCheckIns;
use App\Models\FormSubmission;
use App\Models\SessionCheckIn;
use App\Models\TransferTicket;
use App\Jobs\ImportAttendeeJob;
use App\Models\AttendeePayment;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\AttendeePurchasedTickets;
use App\Http\Requests\Organizer\Event\User\AttendeeStoreRequest;

class AttendeeController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }
        $eventList = EventApp::ofOwner()->where('id', '!=', session('event_id'))->get();
        $attendees = $this->datatable(Attendee::currentEvent()->with('eventCheckin'));
        return Inertia::render('Organizer/Events/Users/Attendees/Index', compact('attendees', 'eventList'));
    }


    public function store(Request $request)
    {
        if (! Auth::user()->can('create_attendees')) {
            abort(403);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:attendees,email',
        ]);
        if (!session()->has('event_id')) {
            return redirect()->back()->withErrors(['error' => 'Event ID not found in session.']);
        }
        $user = Attendee::create([
            'event_app_id' => session('event_id'),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'company' => $request->company,
            'position' => $request->position,
            'phone' => $request->phone,
            'bio' => $request->bio,
            'location' => $request->location,
            'password' => Hash::make("12345678"),
        ]);
        return back()->withSuccess('attendee created successfully.');
    }


    public function update(AttendeeStoreRequest $request, Attendee $attendee)
    {
        if (! Auth::user()->can('edit_attendees')) {
            abort(403);
        }

        $input = $request->validated();

        $attendee->update($input);

        return back()->withSuccess('attendee updated successfully.');
    }

    public function updateAttendee(Request $request, $id)
    {
        if (! Auth::user()->can('edit_attendees')) {
            abort(403);
        }

        $data = $request->all();

        // Remove password if it's null or empty
        if ($data['password'] == null) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $user = Attendee::findOrFail($id);
        $user->update($data);

        return back()->withSuccess('Attendee updated successfully');
    }

    public function destroy(Attendee $attendee)
    {
        if (! Auth::user()->can('delete_attendees')) {
            abort(403);
        }

        $attendee->delete();
        return back()->withSuccess('Attendee deleted successfully.');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_attendees')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|Array'
        ]);
        foreach ($request->ids as $id) {
            Attendee::find($id)->delete();
        }
        return back()->withSuccess('Attendees deleted successfully.');
    }


    public function showInfo(String $id)
    {
        $sessionsPurchased = AttendeePayment::where('attendee_id', $id)
            ->with('purchased_tickets.ticket.sessions.eventDate') // eager load sessions
            ->get()
            ->flatMap(function ($payment) {
                return $payment->purchased_tickets->flatMap(function ($ticket) {
                    if ($ticket->ticket && $ticket->ticket->sessions) {
                        return $ticket->ticket->sessions;
                    }
                    return collect();
                });
            })
            ->unique('id') // remove duplicates
            ->values();
        // dd($sessionsPurchased->toArray());
        //Group By all Dates of Session
        $sessionsPurchased = $sessionsPurchased->groupBy(function ($item) {
            return Carbon::parse($item->eventDate->date)->format('M d, Y');
        })->toArray();
        //        return $sessionsPurchased;
        // attendee sessions
        $sessions = DB::table('attendee_event_session')
            ->join('event_sessions', 'attendee_event_session.event_session_id', '=', 'event_sessions.id')
            ->leftJoin('session_check_ins', function ($join) use ($id) {
                $join->on('event_sessions.id', '=', 'session_check_ins.session_id')
                    ->where('session_check_ins.attendee_id', '=', $id);
            })->where('attendee_event_session.attendee_id', $id)
            ->select(
                'event_sessions.name as session_name',
                'event_sessions.start_time',
                'event_sessions.end_time',
                'session_check_ins.checked_in as check_in_time',
                DB::raw("CASE WHEN session_check_ins.id IS NOT NULL THEN 'Checked In' ELSE 'Not Checked In' END as status")
            )->get()->toArray();

        // attendee tickets
        // $tickets = DB::table('attendee_payments')
        //     ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
        //     ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
        //     ->where('attendee_payments.attendee_id', $id)
        //     ->where('attendee_payments.status', 'paid')
        //     ->select(
        //         'event_app_tickets.name as ticket_name',
        //         'attendee_payments.amount_paid as amount',
        //         'attendee_payments.payment_method as type',
        //         'attendee_purchased_tickets.qty as qty'
        //     )->get();
        // $tickets = DB::table('attendee_payments')
        //     ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
        //     ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
        //     ->where('attendee_payments.attendee_id', $id)
        //     ->where('attendee_payments.status', 'paid')
        //     ->groupBy('attendee_purchased_tickets.id', 'attendee_payments.id', 'event_app_tickets.name', 'attendee_payments.payment_method')
        //     ->select(
        //     'attendee_purchased_tickets.id as attendee_purchased_ticket_id',
        //         'event_app_tickets.name as ticket_name',
        //         DB::raw('SUM(attendee_purchased_tickets.qty) as qty'),
        //         DB::raw('SUM(attendee_payments.amount_paid) as amount'),
        //         'attendee_payments.payment_method as type'
        //     )
        //     ->get();
        $tickets = DB::table('attendee_payments')
            ->join('attendee_purchased_tickets', 'attendee_payments.id', '=', 'attendee_purchased_tickets.attendee_payment_id')
            ->join('event_app_tickets', 'attendee_purchased_tickets.event_app_ticket_id', '=', 'event_app_tickets.id')
            ->leftJoin('addon_purchased_ticket', 'attendee_purchased_tickets.id', '=', 'addon_purchased_ticket.attendee_purchased_ticket_id')
            ->where('attendee_payments.attendee_id', $id)
            ->where('attendee_payments.status', 'paid')
            ->groupBy('attendee_purchased_tickets.id', 'attendee_payments.id', 'event_app_tickets.name', 'attendee_payments.payment_method')
            ->select(
                'attendee_purchased_tickets.id as attendee_purchased_ticket_id',
                'event_app_tickets.name as ticket_name',
                DB::raw('SUM(attendee_purchased_tickets.qty) as qty'),
                DB::raw('SUM(attendee_payments.amount_paid) as amount'),
                'attendee_payments.payment_method as type',
                DB::raw('COUNT(attendee_purchased_ticket_id) as addons_count')  // Add count of addons
            )
            ->get();


        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $user = Attendee::where('id', $id)->first();
        $attendee = FormSubmission::where('attendee_id', $id)->with('fieldValues', 'attendee', 'formFields')->get();
        return Inertia::render('Organizer/Events/Users/Attendees/AttendeeProfile/Profile', compact('attendee', 'user', 'sessions', 'tickets', 'sessionsPurchased'));
    }

    public function getPurchasedTicketAddons(AttendeePurchasedTickets  $attendeePurchasedTicket)
    {
        $attendeePurchasedTicket->load('purchased_addons');
        return response()->json(['addons' => $attendeePurchasedTicket->purchased_addons]);
    }

    public function eventChechIn(Attendee $attendee)
    {
        $event = EventApp::find(session('event_id'));

        if (! Auth::user()->can('scan_events', $event)) {
            abort(403);
        }

        $checkedIn = EventCheckIns::where('event_app_id', $event->id)
            ->where('attendee_id', $attendee->id)
            ->exists();

        if ($checkedIn) {
            return back()->withError("Already checked in");
        }

        EventCheckIns::create([
            'attendee_id' => $attendee->id,
            'event_app_id' => $event->id,
            'checked_in' => now(),
        ]);

        return back()->withSuccess("Checked in successfully");
    }

    public function chechIn(Request $request)
    {

        if (eventSettings()->getValue('enable_check_in') == true) {
            $checkedIn = EventCheckIns::where('event_app_id', session('event_id'))
                ->where('attendee_id', $request->attendee['id'])
                ->exists();

            if (!$checkedIn) {
                return back()->withError("This User is not checked in to the event.");
            }
        }

        $alreadyCheckedIn = SessionCheckIn::where('attendee_id', $request->attendee['id'])
            ->where('session_id', $request->event_session_id)
            ->exists();
        if ($alreadyCheckedIn) {
            return back()->withErrors(['session' => 'You have already checked into this session.']);
        }
        SessionCheckIn::create([
            'attendee_id' => $request->attendee['id'],
            'session_id' => $request->event_session_id,
            'checked_in' => Carbon::now()->toDateTimeString(),
            'qr_code' => $request->attendee['qr_code'],
        ]);

        return back()->withSuccess("Check In Successfully");
    }

    public function qrCodeAttendee(Attendee $attendee)
    {
        $attendee->load('payments.purchased_tickets.ticket.ticketType'); // eager load purchased_tickets too
        // Filter only 'paid' payments
        $paidPayments = $attendee->payments->filter(function ($payment) {
            return $payment->status === 'paid';
        });

        if ($paidPayments->isEmpty()) {
            return Inertia::render('Organizer/Events/Users/Attendees/QrCode', [
                'hasTickets' => false,
            ]);
        }

        $image = [];
        $eventApp = null;

        // Loop through all paid payments
        foreach ($paidPayments as $payment) {
            if (!$eventApp) {
                $eventApp = EventApp::find($payment->event_app_id);
            }

            foreach ($payment->purchased_tickets as $purchasedTicket) {
                $image[] = [
                    'qr_code' => asset('storage/' . $purchasedTicket->qr_code),
                    'purchased_id' => $purchasedTicket->id,
                    'transfer_check' => $purchasedTicket->is_transfered,
                    'ticket_name' => $purchasedTicket->ticket?->name,
                    'ticket_type_name' => isset($purchasedTicket->ticket->ticketType->name) ?
                        $purchasedTicket->ticket->ticketType->name : '', // <-- added line
                ];
            }
        }
        return Inertia::render('Organizer/Events/Users/Attendees/QrCode', [
            'eventApp' => $eventApp,
            'attendee' => $attendee,
            'image' => $image,
            'hasTickets' => true,
        ]);
    }

    public function importFromEvent(Request $request)
    {
        $fromEventId = $request->input('event_id'); // source event
        $toEventId = session('event_id'); // destination event

        ImportAttendeeJob::dispatch($fromEventId, $toEventId);

        return back()->withSuccess("Import Job Dispatched In Successfully");
    }
}
