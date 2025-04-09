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
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        if (! Auth::user()->can('view_event_dashboard')) {
            abort(403);
        }

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
        ));
    }

    public function sessionAttendance()
    {
        $eventSessions = EventSession::currentEvent()->get();

        // Prepare data for the chart
        $sessionNames = $eventSessions->pluck('name')->toArray(); // Array of session names
        $attendanceCounts = $eventSessions->map(function ($session) {
            return SessionCheckIn::where('session_id', $session->id)
                ->whereHas('session', fn($query) => $query->currentEvent())
                ->count(); // Count attendees per session
        })->toArray(); // Array of attendance counts

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
        // Fetch sessions for the current event with attendance counts in one go
        $eventSessions = EventSession::currentEvent()
            ->withCount(['attendances as joined_count' => function ($query) {
                $query->whereNotNull('checked_in'); // Count only checked-in attendees
            }])
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

        // Sort by joinedAttendees in descending order (highest first)
        usort($sessionsData, function ($a, $b) {
            return $b['joinedAttendees'] <=> $a['joinedAttendees'];
        });

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
                'ticketsSold' => $purchasesForTicket->sum('qty'), // Tickets sold for this ticket
                'totalRevenue' => $purchasesForTicket->sum('total'), // Total revenue for this ticket
            ];
        })->toArray();

        // Sort by totalRevenue in descending order
        usort($ticketsData, function ($a, $b) {
            return $b['totalRevenue'] <=> $a['totalRevenue'];
        });

        return [
            'totalTickets' => $totalTickets, // Total ticket types
            'totalTicketsSold' => $totalTicketsSold, // Total tickets sold
            'totalRevenue' => $totalRevenue, // Total revenue from payments
            'ticketsData' => $ticketsData, // All tickets with their metrics
        ];
    }
    public function top10Attendee()
    {
        // Fetch attendees with their payments for the current event, ordered by amount paid
        $attendees = Attendee::whereHas('payments', fn($query) => $query->currentEvent())
            ->with(['payments' => fn($query) => $query->currentEvent()])
            ->get();

        $totalAttendees = $attendees->count(); // Total number of attendees

        // Calculate total revenue from all payments
        $totalRevenue = AttendeePayment::whereHas('attendee', fn($query) => $query->currentEvent())
            ->sum('amount_paid');

        // Prepare data for top 10 attendees
        $attendeeData = $attendees->map(function ($attendee) {
            $amountPaid = $attendee->payments->sum('amount_paid');
            return [
                'first_name' => $attendee->first_name, // Assuming Attendee has a 'name' field
                'email' => $attendee->email, // Assuming Attendee has an 'email' field
                'amountPaid' => $amountPaid, // Total amount paid by this attendee
            ];
        })->sortByDesc('amountPaid') // Sort by amount paid in descending order
        ->take(10) // Limit to top 10
        ->values()
        ->toArray();

        return [
            'totalAttendees' => $totalAttendees, // Total number of attendees
            'totalRevenue' => $totalRevenue, // Total revenue from all payments
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
