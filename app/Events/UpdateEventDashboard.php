<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class UpdateEventDashboard implements ShouldBroadcast 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $eventId;
    public $message;
    /**
     * Create a new event instance.
     */
    public function __construct($eventId,$msg)
    {
        $this->eventId = $eventId;
        $this->message = $msg;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new Channel('event-dashboard-' . $this->eventId);
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'event_id' => $this->eventId
        ];
    }
}
