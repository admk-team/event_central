<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Attendee\AttendeeUpgradeTicketController;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpgradeTicketRequest;
use Illuminate\Http\Request;

class UpgradeTicketController extends Controller
{

    protected $attendee_upgrade_ticket_controller;
    public function __construct(AttendeeUpgradeTicketController $attendeeUpgradeTicketController)
    {
        $this->attendee_upgrade_ticket_controller = $attendeeUpgradeTicketController;
    }


    public function upgradeTickets()
    {
        return $this->attendee_upgrade_ticket_controller->upgradeTickets(true);
    }

    public function saveTicketUpgrade(UpgradeTicketRequest $request)
    {
        return $this->attendee_upgrade_ticket_controller->saveTicketUpgrade($request, true);
    }
}
