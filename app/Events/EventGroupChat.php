<?php

namespace App\Events;

use App\Models\ChatMessage;
use App\Models\EventApp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class EventGroupChat implements ShouldBroadcastNow 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;
    public $eventId;
    public function __construct(ChatMessage $chatMessage)
    {
        $this->message = $chatMessage;
        $this->eventId = $chatMessage->event_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new Channel('event-app-' . $this->eventId);
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message
        ];
    }
}
