<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Attendee\AttendeeUpgradeTicketController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Attendee\UpgradeTicketRequest;
use App\Models\Attendee;
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

    public function saveUpgradedSessions(Attendee $attendee, UpgradeTicketRequest $request)
    {
        return $this->attendee_upgrade_ticket_controller->saveUpgradedSessions($attendee, $request, true);
    }
    
    public function getStripPaymentIntent(Attendee $attendee, Request $request)
    {
        
        // Call the method from the AttendeeUpgradeTicketController
        return $this->attendee_upgrade_ticket_controller->getStripPaymentIntent($attendee, $request, true);
    }

    public function showTicketUpgradeSuccess($uuid){
        return $this->attendee_upgrade_ticket_controller->showTicketUpgradeSuccess($uuid, true);
    }
    
}
