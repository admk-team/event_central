<?php

namespace App\Services;

use App\Models\EventAppSetting;
use Illuminate\Support\Facades\Cache;

class EventSettingsService
{
    public function get(int $event_id, string $key, mixed $default = null)
    {

        //Cache Event Setting queries
        $setting = Cache::remember("{$event_id}_{$key}", now()->addMinutes(10), function () use ($event_id, $key) {
            return EventAppSetting::where('event_app_id', $event_id)->where('key', $key)->first();
        });

        if (! $setting) {
            return $default;
        }

        return $setting;
    }

    public function getValue(int $event_id, string $key, mixed $default = null)
    {
        $setting = $this->get($event_id, $key, $default);
        return is_object($setting) ? $setting->value : $setting;
    }

    public function set(int $event_id, string $key, mixed $value, string | null $group = null, string | null $description = null)
    {
        $setting = EventAppSetting::where('event_app_id', $event_id)->where('key', $key)->first();

        $type = 'string';

        switch (true) {
            case is_numeric($value):
                $type = 'number';
                break;
            case is_bool($value):
                $type = 'boolean';
                break;
            case is_array($value):
                $type = 'json';
                break;
        }

        if (! $setting) {
            $setting = EventAppSetting::create([
                'event_app_id' => $event_id,
                'type' => $type,
                'key' => $key,
                'value' => $value,
                'group' => $group,
                'description' => $description,
            ]);
        } else {
            $setting->update([
                'event_app_id' => $event_id,
                'type' => $type,
                'value' => $value,
                'group' => $group !== null ? $group : $setting->group,
                'description' => $description !== null ? $description : $setting->description,
            ]);
        }

        Cache::forget("{$event_id}_{$key}");

        return $setting;
    }
}
