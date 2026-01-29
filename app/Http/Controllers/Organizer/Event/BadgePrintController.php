<?php

namespace App\Http\Controllers\Organizer\Event;

use Inertia\Inertia;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CustomBadgeAttendee;
use App\Models\EventBadgeDesign;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use chillerlan\QRCode\QROptions;
use chillerlan\QRCode\Common\EccLevel;
use chillerlan\QRCode\QRCode;

class BadgePrintController extends Controller
{
    public function index(Request $request)
    {
        if (! Auth::user()->can('print_badges')) {
            abort(403);
        }
        $eventId = session('event_id');
        $attendees = Attendee::currentEvent()
            ->with(['payments.purchased_tickets.ticket.ticketType'])
            ->get()
            ->flatMap(function ($attendee) {
                $badgeEntries = [];
                
                // Get all paid tickets for this attendee
                $paidTickets = $attendee->payments
                    ->filter(fn($payment) => $payment->status === 'paid')
                    ->flatMap(fn($payment) => $payment->purchased_tickets)
                    ->filter(fn($ticket) => !empty($ticket->code));

                foreach ($paidTickets as $ticket) {
                    // Check if QR file exists; if not, recreate using existing code
                    if (
                        !empty($ticket->code) &&
                        (!Storage::exists($ticket->qr_code) || empty($ticket->qr_code))
                    ) {
                        $qrData = $ticket->code;

                        $options = new QROptions([
                            'eccLevel' => EccLevel::L,
                            'scale' => 5,
                            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
                            'imageBase64' => false,
                        ]);

                        $qrcode = new QRCode($options);

                        if (ob_get_length()) {
                            ob_end_clean();
                        }

                        $path = 'public/qr-codes/' . $ticket->code . '.png';

                        Storage::put($path, $qrcode->render($qrData));

                        $ticket->update([
                            'qr_code' => 'qr-codes/' . $ticket->code . '.png'
                        ]);
                    }

                    // Check if ticket has all three attendee fields filled
                    $hasTicketAttendeeFields = !empty($ticket->attendee_name) 
                        && !empty($ticket->attendee_position) 
                        && !empty($ticket->attendee_location);

                    // If ticket has attendee fields, use them; otherwise use main attendee's fields
                    $badgeEntry = [
                        'name' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_name 
                            : ($attendee->first_name . ' ' . $attendee->last_name),
                        'position' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_position 
                            : $attendee->position,
                        'location' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_location 
                            : $attendee->location,
                        'avatar' => $attendee->avatar,
                        'other_link' => $attendee->other_link,
                        'facebook_link' => $attendee->facebook_link,
                        'linkedin_link' => $attendee->linkedin_link,
                        'twitter_link' => $attendee->twitter_link,
                        'phone' => $attendee->phone,
                        'attendee_name' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_name 
                            : $attendee->attendee_name,
                        'attendee_position' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_position 
                            : $attendee->attendee_position,
                        'attendee_location' => $hasTicketAttendeeFields 
                            ? $ticket->attendee_location 
                            : $attendee->attendee_location,
                        'qr_codes' => collect([
                            [
                                'qr_code' => $ticket->qr_code !== 'EMPTY'
                                    ? asset('storage/' . $ticket->qr_code)
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s',
                                'ticket_name' => optional($ticket->ticket)->name,
                                'ticket_type_name' => optional(optional($ticket->ticket)->ticketType)->name ?? '',
                                'attendee_name' => $ticket->attendee_name ?? '',
                                'attendee_position' => $ticket->attendee_position ?? '',
                                'attendee_location' => $ticket->attendee_location ?? '',
                            ]
                        ])->filter(fn($item) => !empty($item['qr_code'])),
                    ];

                    // Only add if QR code exists
                    if ($badgeEntry['qr_codes']->isNotEmpty()) {
                        $badgeEntries[] = $badgeEntry;
                    }
                }

                return $badgeEntries;
            })
            ->values();

        $eventApp = EventApp::find($eventId);
        $customDesign = $eventApp->load(['badgeDesign.customBadgeAttendee']);
        $customBadgeDesign = 'Default';
        if ($customDesign->badgeDesign && $customDesign->badgeDesign->customBadgeAttendee) {
            $customBadgeDesign = $customDesign->badgeDesign->customBadgeAttendee->name;
        }
        $startDateObj = optional($eventApp->dates()->orderBy('date', 'asc')->first())->date;
        $endDateObj   = optional($eventApp->dates()->orderBy('date', 'desc')->first())->date;

        $startDate = $startDateObj ? \Carbon\Carbon::parse($startDateObj)->format('F j, Y') : null;
        $endDate   = $endDateObj ? \Carbon\Carbon::parse($endDateObj)->format('F j, Y') : null;
        // dd($attendees);
        return Inertia::render('Organizer/Events/BadgePrint/Index', compact(
            'attendees',
            'eventApp',
            'customBadgeDesign',
            'startDate',
            'endDate',
        ));
    }

    public function customBadgePrint(Request $request)
    {
        $search = request('search'); // from request/query param

        $attendees = Attendee::currentEvent()
            ->with(['payments.purchased_tickets.ticket.ticketType'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    // Search attendee full name
                    $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"])
                        // Or search ticket name
                        ->orWhereHas('payments.purchased_tickets.ticket', function ($q2) use ($search) {
                            $q2->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->get()
            ->map(function ($attendee) {
                return [
                    'name' => $attendee->first_name . ' ' . $attendee->last_name,
                    'position' => $attendee->position,
                    'location' => $attendee->location,
                    'qr_codes' => $attendee->payments
                        ->filter(fn($payment) => $payment->status === 'paid')
                        ->flatMap(function ($payment) {
                            return $payment->purchased_tickets->map(function ($ticket) {

                                // Ensure QR exists
                                if (
                                    !empty($ticket->code) &&
                                    (!Storage::exists($ticket->qr_code) || empty($ticket->qr_code))
                                ) {
                                    $qrData = $ticket->code;

                                    $options = new QROptions([
                                        'eccLevel' => EccLevel::L,
                                        'scale' => 5,
                                        'outputType' => QRCode::OUTPUT_IMAGE_PNG,
                                        'imageBase64' => false,
                                    ]);

                                    $qrcode = new QRCode($options);

                                    if (ob_get_length()) {
                                        ob_end_clean();
                                    }

                                    $path = 'public/qr-codes/' . $ticket->code . '.png';
                                    Storage::put($path, $qrcode->render($qrData));

                                    $ticket->update([
                                        'qr_code' => 'qr-codes/' . $ticket->code . '.png'
                                    ]);
                                }

                                return [
                                    'qr_code' => $ticket->qr_code !== 'EMPTY'
                                        ? asset('storage/' . $ticket->qr_code)
                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s',
                                    'ticket_name' => optional($ticket->ticket)->name,
                                    'ticket_type_name' => optional(optional($ticket->ticket)->ticketType)->name ?? '',
                                    'attendee_name' => $ticket->attendee_name ?? '',
                                    'attendee_position' => $ticket->attendee_position ?? '',
                                    'attendee_location' => $ticket->attendee_location ?? '',
                                ];
                            });
                        })
                        ->filter(fn($item) => !empty($item['qr_code']))
                        ->values(),
                ];
            })
            ->filter(fn($item) => $item['qr_codes']->isNotEmpty())
            ->values();


        $eventApp = EventApp::find(session('event_id'));
        $customDesign = $eventApp->load(['badgeDesign.customBadgeAttendee']);
        $customBadgeDesign = null;
        if ($customDesign->badgeDesign && $customDesign->badgeDesign->customBadgeAttendee) {
            $customBadgeDesign = $customDesign->badgeDesign->customBadgeAttendee;
            // Now replace mail_content for each attendee
            $content = $customBadgeDesign->mail_content;

            $content = $customBadgeDesign->mail_content;

            // Extract <head> (if exists)
            preg_match('/<head.*?>(.*?)<\/head>/is', $content, $headMatch);
            $head = $headMatch[1] ?? '';

            // Extract <body> content (template for one badge)
            preg_match('/<body.*?>(.*?)<\/body>/is', $content, $bodyMatch);
            $bodyTemplate = $bodyMatch[1] ?? $content;

            // Build the final HTML
            $finalHtml = '
<html>
    <head>
        ' . $head . '
        <link rel="stylesheet" href="' . asset('assets/passes.css') . '">
    </head>
    <body>
        <div class="printable">
';

            foreach ($attendees as $attendee) {
                foreach ($attendee['qr_codes'] as $qr) {
                    // Shortcode replacements
                    $replacements = [
                        '{{ $attendeename }}' => e($attendee['name']),
                        '{{ $attendeeposition }}' => e($attendee['position'] ?? ''),
                        '{{ $eventlocation }}' => e($attendee['location'] ?? ''),
                        '{{ $ticketname }}' => e($qr['ticket_name'] ?? ''),
                        '{{ $tickettype }}' => e($qr['ticket_type_name'] ?? ''),
                        '{{ $ticketqrcode }}' => '<img class="qr-code-img" style=" margin-left:200px; font-size: 14px;line-height: 140%;text-align: center;word-wrap: break-word;" src="' . $qr['qr_code'] . '" alt="QR Code" />',
                    ];

                    $badgeHtml = str_replace(array_keys($replacements), array_values($replacements), $bodyTemplate);

                    // Wrap with print classes for sizing + page breaks
                    $finalHtml .= '<div class="passWrapper"><div class="badgeContent">' . $badgeHtml . '</div></div>';
                }
            }

            $finalHtml .= '
        </div>
    </body>
</html>
';
        }

        return view('custombadge.index', compact('customBadgeDesign', 'finalHtml'));
    }
}
