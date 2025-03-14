<?php

use App\Services\EventSettingsService;

/**
 * Get and set event settings based on current selected event
 */
if (! function_exists('eventSettings')) {
    function eventSettings(?int $eventId = null)
    {
        if (is_null($eventId)) {
            $eventId = session('event_id');
        }
        
        return new class($eventId) {
            protected $service;

            public function __construct(protected $eventId) 
            {
                $this->service = new EventSettingsService();
            }

            public function get(string $key, mixed $default = null)
            {
                return $this->service->get($this->eventId, $key, $default);
            }

            public function getValue(string $key, mixed $default = null)
            {
                return $this->service->getValue($this->eventId, $key, $default);
            }

            public function set(string $key, mixed $value, string | null $group = null, string | null $description = null)
            {
                return $this->service->set($this->eventId, $key, $value, $group, $description);
            }
        };
    }   
}