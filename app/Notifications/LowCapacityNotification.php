<?php

namespace App\Notifications;

use App\Models\EventSession;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LowCapacityNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public EventSession $session;

    /**
     * Create a new notification instance.
     */
    public function __construct(EventSession $session)
    {
        $this->session = $session;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail']; // you can also add 'database' or 'broadcast'
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Low Capacity Alert')
            ->line("The session **{$this->session->name}** is running low on capacity.")
            ->line("Total capacity: {$this->session->capacity}")
            ->line("Remaining seats: {$this->session->current_capacity}")
            ->line('Please take action if needed.');
    }
}
