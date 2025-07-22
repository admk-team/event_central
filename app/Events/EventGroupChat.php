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

class EventGroupChat
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $event;
    public $message;

    public function __construct(EventApp $event, ChatMessage $chatMessage)
    {
        $this->event = $event;
        $this->message = $chatMessage;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('event-app-' . $this->event->id),
        ];
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message->message,
            'sender' => $this->message->sender->only('id', 'name'),
            'timestamp' => $this->message->created_at->toDateTimeString(),
        ];
    }
}
