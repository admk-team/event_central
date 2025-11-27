<?php

namespace App\Http\Controllers\Organizer\Event\User;

use App\Events\UpdateEventDashboard;
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
use App\Models\AddonVariant;
use App\Mail\AttendeeRegisteration;
use App\Models\ChatMember;
use App\Models\Country;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;

class AttendeeController extends Controller
{
    public function index(Request $request)
    {
        // Store filter in session
        if ($request->has('filter')) {
            session(['attendee_filter' => $request->filter]);
        }

        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }
        $query = Attendee::currentEvent()->with('eventCheckin');

        // Apply Filter
        $session_filter = session('attendee_filter', 'all');
        if ($session_filter === 'checked_in') {
            // attendee has eventCheckin record
            $query->whereHas('eventCheckin');
        }
        if ($session_filter === 'not_checked_in') {
            // attendee has NO eventCheckin record
            $query->whereDoesntHave('eventCheckin');
        }
        $eventList = EventApp::ofOwner()->where('id', '!=', session('event_id'))->get();
        $attendees = $this->datatable($query)->appends(['filter' => $session_filter]);
        $countries = Country::orderBy('title')->get();
        $filter = $session_filter;
        //dd($countries);
        return Inertia::render('Organizer/Events/Users/Attendees/Index', compact('attendees', 'eventList', 'countries', 'filter'));
    }


    public function store(Request $request)
    { //dd($request);
        if (! Auth::user()->can('create_attendees')) {
            abort(403);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'country' => 'required',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('attendees', 'email')->where('event_app_id', session('event_id')),
            ],
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'password' => 'required',
            'string',
            'min:8',
            'confirmed',
        ]);
        if (!session()->has('event_id')) {
            return redirect()->back()->withErrors(['error' => 'Event ID not found in session.']);
        }
        $event_app = EventApp::where('id', session('event_id'))->first();
        $url = route('organizer.events.website', $event_app->uuid);

        $user = Attendee::create([
            'event_app_id' => session('event_id'),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'company' => $request->company,
            'country' => $request->country,
            'position' => $request->position,
            'phone' => $request->phone,
            'bio' => $request->bio,
            'location' => $request->location,
            'password' => Hash::make($request->password),
            'is_public' => $request->is_public == 1 ? true : false,
        ]);
        broadcast(new UpdateEventDashboard(session('event_id'), 'Attendee Created'))->toOthers();
        Mail::to($user->email)->send(new AttendeeRegisteration($user->first_name, $user->last_name, $request->password, $user->email, $event_app, $url));
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
        broadcast(new UpdateEventDashboard(session('event_id'), 'Attendee Deleted'))->toOthers();
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
        broadcast(new UpdateEventDashboard(session('event_id'), 'Attendee Deleted'))->toOthers();
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
            ->groupBy(
                'attendee_purchased_tickets.id',
                'attendee_payments.id',
                'attendee_purchased_tickets.event_app_ticket_id',
                'attendee_purchased_tickets.attendee_name',
                'attendee_purchased_tickets.attendee_position',
                'attendee_purchased_tickets.attendee_location',
                'event_app_tickets.id',
                'event_app_tickets.name',
                'attendee_payments.payment_method',
                'attendee_payments.extra_services',
                // add this line to satisfy ONLY_FULL_GROUP_BY
                'event_app_tickets.extra_service_name'
            )
            ->select(
                'attendee_purchased_tickets.id as attendee_purchased_ticket_id',
                'attendee_purchased_tickets.event_app_ticket_id',
                'attendee_purchased_tickets.attendee_name',
                'attendee_purchased_tickets.attendee_position',
                'attendee_purchased_tickets.attendee_location',
                'event_app_tickets.id as ticket_id',
                'event_app_tickets.name as ticket_name',
                DB::raw('SUM(attendee_purchased_tickets.qty) as qty'),
                DB::raw('SUM(attendee_payments.amount_paid) as amount'),
                'attendee_payments.payment_method as type',
                'attendee_payments.extra_services',
                // pick the name from event_app_tickets
                'event_app_tickets.extra_service_name as ticket_extra_service_name',
                DB::raw('COUNT(attendee_purchased_ticket_id) as addons_count')
            )
            ->get();

        if (! Auth::user()->can('view_attendees')) {
            abort(403);
        }

        $user = Attendee::where('id', $id)->first();
        $attendee = FormSubmission::where('attendee_id', $id)->with('fieldValues', 'attendee', 'formFields')->get();
        // dd($tickets);
        return Inertia::render('Organizer/Events/Users/Attendees/AttendeeProfile/Profile', compact('attendee', 'user', 'sessions', 'tickets', 'sessionsPurchased'));
    }

    public function getPurchasedTicketAddons(AttendeePurchasedTickets  $attendeePurchasedTicket)
    {
        $attendeePurchasedTicket->load('purchased_addons');
        $addons = $attendeePurchasedTicket->purchased_addons;
        $addon_attributes = [];
        foreach ($addons as $addon) {
            $pivot = DB::table('addon_purchased_ticket')
                ->where('attendee_purchased_ticket_id', $attendeePurchasedTicket->id)
                ->where('addon_id', $addon->id)
                ->first();

            $variant = AddonVariant::with(['attributeValues' => ['addonAttribute', 'addonAttributeOption']])->find($pivot->addon_variant_id);
            if (! $variant) continue;

            $addon->price = $variant->price;
            $addon_attributes[$addon->id] = [];
            foreach ($variant->attributeValues as $attrValue) {
                $attribute = $attrValue->addonAttribute;
                $option = $attrValue->addonAttributeOption;
                $addon_attributes[$addon->id][$attribute->name] = $option->value;
            }
        }

        $addons = $addons->toArray();
        foreach ($addons as &$addon) {
            $addon['attributes'] = $addon_attributes[$addon['id']] ?? [];
        }

        return response()->json(['addons' => $addons]);
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


    public function initiateChat($id)
    {
        $event = EventApp::find(session('event_id'));
        $attendee = Attendee::find($id);

        if (!$event) {
            return back()->withError('No active event found.');
        }
        if (!$attendee) {
            return back()->withError('No attendee found.');
        }

        $existing = ChatMember::where('event_id', $event->id)
            ->where('user_id', Auth::user()->id)
            ->where('participant_id', $attendee->id)
            ->first();

        if ($existing) {
            return back()->withError('A chat with this attendee already exists.');
        }

        ChatMember::create([
            'event_id' => $event->id,
            'user_id' => Auth::user()->id,
            'user_type' => \App\Models\User::class,
            'participant_id' => $attendee->id,
            'participant_type' => \App\Models\Attendee::class,
        ]);

        return back()->withSuccess('Chat initiated successfully.');
    }
    public function returnTicket($id)
    {
        // $attendee = Attendee::where('id', $id)->with('attendeePurchasedTickets');

        $attendee = $id;
        dd($attendee);
    }

    public function editPurchasedTicketFormFields(Request $request)
    {
        // For debugging per request: just dump submitted form_fields
        // Expected payload from UI:
        // attendee_purchased_ticket_id, form_fields => [person_name, position, location, attendee_purchased_ticket_id]
        // dd($request->input('form_fields'));
        AttendeePurchasedTickets::where('id', $request->form_fields['attendee_purchased_ticket_id'])->update([
            'attendee_name' => $request->form_fields['person_name'],
            'attendee_position' => $request->form_fields['position'],
            'attendee_location' => $request->form_fields['location'],
        ]);
        return back()->withSuccess('Ticket details updated successfully.');
    }
}
