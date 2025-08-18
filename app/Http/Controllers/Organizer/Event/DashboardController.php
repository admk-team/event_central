<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\SessionCheckIn;
use App\Models\AttendeePayment;
use App\Models\AttendeePurchasedTickets;
use App\Models\EventApp;
use App\Models\EventAppTicket;
use App\Models\EventPartner;
use App\Models\EventPost;
use App\Models\EventSession;
use App\Models\EventSpeaker;
use App\Models\OrganizerPaymentKeys;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // if (! Auth::user()->can('view_event_dashboard')) {
        //     abort(403);
        // }

        if (Auth::user()->can('view_event_dashboard')) {
            $totalAttendee = EventApp::where('organizer_id', Auth::user()->id)->where('id', session('event_id'))->withCount('attendees')->get()->sum('attendees_count');
            $totalSession = EventApp::where('organizer_id', Auth::user()->id)->where('id', session('event_id'))
                ->withCount('event_sessions')
                ->get()
                ->sum('event_sessions_count');
            $totalTickets = EventApp::where('organizer_id', Auth::user()->id)
                ->where('id', session('event_id'))
                ->withCount('tickets')
                ->get()
                ->sum('tickets_count');
            $totalPartners = EventPartner::currentEvent()->count();
            $totalSpeakers = EventSpeaker::currentEvent()->count();
            $totalPosts = EventPost::currentEvent()->count();
            $sessionAttendance = $this->sessionAttendance();
            $totalRevenue = $this->totalRevenue();
            $topSession = $this->topSession();

            $ticketsMetrics = $this->ticketsMetrics();
            $top10Attendee = $this->top10Attendee();
            $event_id = session('event_id');


            $organizerId = EventApp::findOrFail($event_id);
            $getCurrency = OrganizerPaymentKeys::where('user_id', $organizerId->organizer_id)->value('currency');

            // dd($ticketsMetrics);
            return Inertia::render('Organizer/Events/Dashboard/index', compact(
                'totalAttendee',
                'totalSession',
                'totalPartners',
                'totalSpeakers',
                'totalTickets',
                'totalPosts',
                'sessionAttendance',
                'topSession',
                'ticketsMetrics',
                'top10Attendee',
                'totalRevenue',
                'event_id',
                'getCurrency'
            ));
        } else {
            return Inertia::render('Organizer/Events/Dashboard/Empty');
        }
    }

    public function sessionAttendance()
    {
        // Fetch the top 10 sessions for the current event based on attendance counts
        $eventSessions = EventSession::currentEvent()
            ->withCount(['attendances as attendance_count' => function ($query) {
                $query->whereNotNull('checked_in'); // Assuming checked_in indicates attendance
            }])
            ->orderBy('attendance_count', 'desc') // Sort by attendance count in descending order
            ->take(5) // Limit to top 5 sessions
            ->get();

        // Prepare data for the chart
        $sessionNames = $eventSessions->pluck('name')->toArray(); // Array of top 10 session names
        $attendanceCounts = $eventSessions->pluck('attendance_count')->toArray(); // Array of top 10 attendance counts

        // Return in ApexCharts series format
        return [
            'sessionNames' => $sessionNames,
            'series' => [
                [
                    'name' => 'Sessions', // Match static example
                    'data' => $attendanceCounts,
                ],
            ],
        ];
    }
    public function topSession()
    {
        // Fetch the top 10 sessions for the current event with attendance counts
        $eventSessions = EventSession::currentEvent()
            ->withCount(['attendances as joined_count' => function ($query) {
                $query->whereNotNull('checked_in'); // Count only checked-in attendees
            }])
            ->orderBy('joined_count', 'desc') // Sort by joined_count in descending order
            ->take(10) // Limit to top 10 sessions
            ->get();

        // Get total registered attendees for the event
        $totalAttendee = EventApp::where('organizer_id', Auth::user()->id)
            ->where('id', session('event_id'))
            ->withCount('attendees')
            ->get()
            ->sum('attendees_count');

        // Prepare data for the table
        $sessionsData = $eventSessions->map(function ($session) use ($totalAttendee) {
            return [
                'sessionName' => $session->name,
                'registeredAttendees' => $totalAttendee, // Total registered for the event
                'joinedAttendees' => $session->joined_count ?? 0, // Attendees who joined this session
            ];
        })->toArray();

        return $sessionsData;
    }
    public function ticketsMetrics()
    {
        // Fetch all ticket types for the current event
        $allTickets = EventAppTicket::currentEvent()->get();
        $totalTickets = $allTickets->count(); // Total number of ticket types

        // Get ticket purchases for the current event
        $ticketPurchases = AttendeePurchasedTickets::whereHas('payment', fn($query) => $query->currentEvent())->get();

        // Total tickets sold and revenue (event-wide)
        $totalTicketsSold = $ticketPurchases->sum('qty'); // Total quantity sold

        // Extract payment IDs from ticket purchases and calculate total revenue
        $paymentIds = $ticketPurchases->pluck('attendee_payment_id')->unique()->values(); // Get unique payment IDs
        $totalRevenue = AttendeePayment::whereIn('id', $paymentIds)->sum('amount_paid'); // Sum amount_paid from payments

        // Prepare data for all tickets (including those with zero sales)
        $ticketsData = $allTickets->map(function ($ticket) use ($ticketPurchases) {
            $purchasesForTicket = $ticketPurchases->where('event_app_ticket_id', $ticket->id);
            return [
                'ticketName' => $ticket->name,
                'ticketsSold' => $purchasesForTicket->sum('qty'),
                // 'totalRevenue' => $purchasesForTicket->sum('total'),
            ];
        })->toArray();

        // Sort by totalRevenue in descending order
        usort($ticketsData, fn($a, $b) => $b['ticketsSold'] <=> $a['ticketsSold']);

        // Keep only top 5 tickets
        $topTickets = $ticketsData;

        return [
            'totalTickets' => $totalTickets,
            'totalTicketsSold' => $totalTicketsSold,
            'totalRevenue' => $totalRevenue,
            'ticketsData' => $topTickets, // Only top 5 tickets for graph
        ];
    }
    public function top10Attendee()
    {
        // Fetch attendees with their payments for the current event
        $attendees = Attendee::whereHas('payments', fn($query) => $query->currentEvent())
            ->with(['payments' => fn($query) => $query->currentEvent()])
            ->get();

        // Total number of attendees
        $totalAttendees = $attendees->count();

        // Fetch ticket purchases for the current event to calculate total revenue and ticket metrics
        $ticketPurchases = AttendeePurchasedTickets::whereHas('payment', fn($query) => $query->currentEvent())
            ->with(['payment']) // Eager load payment to avoid N+1 queries
            ->get();

        // Total tickets sold (event-wide)
        $totalTicketsSold = $ticketPurchases->sum('qty');

        // Extract payment IDs from ticket purchases and calculate total revenue
        $paymentIds = $ticketPurchases->pluck('attendee_payment_id')->unique()->values();
        $totalRevenue = AttendeePayment::whereIn('id', $paymentIds)->sum('amount_paid');

        // Fetch all ticket types for the current event
        $allTickets = EventAppTicket::currentEvent()->get();
        $totalTicketTypes = $allTickets->count();

        // Prepare data for top 10 attendees
        $attendeeData = $attendees->map(function ($attendee) {
            $amountPaid = $attendee->payments->sum('amount_paid');
            return [
                'first_name' => $attendee->first_name,
                'email' => $attendee->email,
                'amountPaid' => $amountPaid,
            ];
        })->sortByDesc('amountPaid')
          ->take(10)
          ->values()
          ->toArray();

        return [
            'totalAttendees' => $totalAttendees, // Total number of attendees
            'totalRevenue' => $totalRevenue, // Total revenue from all payments
            'totalTicketsSold' => $totalTicketsSold, // Total tickets sold
            'totalTicketTypes' => $totalTicketTypes, // Total number of ticket types
            'attendeeData' => $attendeeData, // Top 10 attendees with their metrics
        ];
    }
    public function totalRevenue()
    {
        // Fetch all ticket types for the current event
        $allTickets = EventAppTicket::currentEvent()->get();
        $totalTickets = $allTickets->count(); // Total number of ticket types

        // Get ticket purchases for the current event
        $ticketPurchases = AttendeePurchasedTickets::whereHas('payment', fn($query) => $query->currentEvent())->get();

        // Total tickets sold and revenue (event-wide)
        $totalTicketsSold = $ticketPurchases->sum('qty'); // Total quantity sold

        // Extract payment IDs from ticket purchases and calculate total revenue
        $paymentIds = $ticketPurchases->pluck('attendee_payment_id')->unique()->values(); // Get unique payment IDs
        $totalRevenue = AttendeePayment::whereIn('id', $paymentIds)->sum('amount_paid'); // Sum amount_paid from payments
        return [
            'totalRevenue' => $totalRevenue, // Total number of attendees
        ];
    }
}
