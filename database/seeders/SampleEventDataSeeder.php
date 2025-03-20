<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleEventDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Events
        DB::statement("INSERT INTO `event_apps` (`id`, `uuid`, `organizer_id`, `name`, `logo`, `description`, `location_type`, `location_base`, `type`, `schedual_type`, `created_at`, `updated_at`, `event_app_category_id`, `is_recurring`, `recurring_type_id`) VALUES
        (1, '9e79c502-1a50-4d01-bd0b-9f73db250cc9', 2, 'Kids & Family', 'events-avatars/event-logo-1.png', 'test', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:14', '2025-03-20 03:12:14', 1, 0, NULL),
        (2, '9e79c52f-7abb-4277-b7d5-771cf8f3fd7b', 2, 'octv localhsot', 'events-avatars/event-logo-2.jpg', 'test event 2', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:44', '2025-03-20 03:12:44', 2, 1, 1)");

        //Speaker
        DB::statement("INSERT INTO `event_speakers` (`id`, `event_app_id`, `name`, `avatar`, `company`, `position`, `bio`, `email`, `phone`, `web`, `linkedin`, `facebook`, `twitter`, `instagram`, `country`, `language`, `created_at`, `updated_at`) VALUES
        (1, 1, 'Speaker 1', 'organizer/organizer-avatars/67dbce53f0c37.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:14:11', '2025-03-20 03:14:11'),
        (2, 2, 'Speaker 1', 'organizer/organizer-avatars/67dbce7569275.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:14:45', '2025-03-20 03:14:45'),
        (3, 2, 'Speaker 2', 'organizer/organizer-avatars/67dbce8a3ac3a.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:15:06', '2025-03-20 03:15:06')");

        //Event Plateform
        DB::statement("INSERT INTO `event_platforms` (`id`, `event_app_id`, `type`, `name`, `created_at`, `updated_at`) VALUES
        (1, 2, 'Stage', 'MAIN STAGE', '2025-03-20 03:32:48', '2025-03-20 03:32:48')");


        //Even Dates
        DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
        (1, 2, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");
        DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
        (2, 2, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");

        //Sessions
        DB::statement("INSERT INTO `event_sessions` (`id`, `event_app_id`, `event_speaker_id`, `event_platform_id`, `event_date_id`, `name`, `type`, `description`, `capacity`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
        (1, 2, 2, 1, 1, 'Session 1', 'Workshop', 'test session 1', 100, '00:00:00', '00:00:00', '2025-03-20 03:16:16', '2025-03-20 03:16:16'),
        (2, 2, 3, 1, 1, 'Session 2', 'Workshop', 'test session 2', 150, '00:00:00', '00:00:00', '2025-03-20 03:16:36', '2025-03-20 03:16:36')");


        //Tickets
        DB::statement("INSERT INTO `event_app_tickets` (`id`, `event_app_id`, `name`, `description`, `type`, `base_price`, `addon_features`, `increment_by`, `increment_rate`, `increment_type`, `start_increment`, `end_increment`, `created_at`, `updated_at`) VALUES
        (1, 2, 'Normal Ticket', 'test ticket', 'NORMAL', '35.00', NULL, '23.00', '34.00', 'Percentage', '2025-03-20', '2025-03-22', '2025-03-20 03:18:14', '2025-03-20 03:18:14'),
        (2, 2, 'VIP Ticket', 'test desc', 'NORMAL', '96.00', NULL, '23.00', '32.00', 'Percentage', '2025-03-20', '2025-03-20', '2025-03-20 03:18:56', '2025-03-20 03:18:56');");


        DB::statement("INSERT INTO `session_ticket` (`event_app_ticket_id`, `event_session_id`, `created_at`, `updated_at`) VALUES
        (1, 1, NULL, NULL),
        (1, 2, NULL, NULL),
        (2, 1, NULL, NULL),
        (2, 2, NULL, NULL)");

        //Promo Code
        DB::statement("INSERT INTO `promo_codes` (`id`, `event_app_id`, `code`, `description`, `discount_type`, `discount_value`, `usage_limit`, `used_count`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
        (1, 2, 'disc50%', 'Discount of 50 percent', 'percentage', '50.00', 25, 0, '2025-03-20', '2025-03-22', 'active', '2025-03-20 03:20:18', '2025-03-20 03:20:18'),
        (2, 2, 'DISC25V', 'Discount of 25 in total ticket value', 'fixed', '25.00', 50, 0, '2025-03-20', '2025-03-20', 'active', '2025-03-20 03:21:04', '2025-03-20 03:21:04')");

        //Maintain Relationship
        DB::statement("INSERT INTO `promo_code_ticket` (`promo_code_id`, `event_app_ticket_id`, `created_at`, `updated_at`) VALUES
        (1, 1, NULL, NULL),
        (1, 2, NULL, NULL),
        (2, 1, NULL, NULL),
        (2, 2, NULL, NULL)");
    }
}
