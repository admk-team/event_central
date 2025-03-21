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
        $this->command->info('Seeding Sample Event Data...');

        //Events
        DB::statement("INSERT INTO `event_apps` (`id`, `uuid`, `organizer_id`, `name`, `logo`, `description`, `location_type`, `location_base`, `type`, `schedual_type`, `created_at`, `updated_at`, `event_app_category_id`, `is_recurring`, `recurring_type_id`) VALUES
        (1, '9e79c502-1a50-4d01-bd0b-9f73db250cc9', 2, 'Kids & Family', 'events-avatars/event-logo-1.png', 'test', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:14', '2025-03-20 03:12:14', 1, 0, NULL),
        (2, '9e79c52f-7abb-4277-b7d5-771cf8f3fd7b', 2, 'octv localhsot', 'events-avatars/event-logo-2.jpg', 'test event 2', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:44', '2025-03-20 03:12:44', 2, 1, 1)");

        $this->command->info('  1. Sample Events Created');

        //Speaker
        DB::statement("INSERT INTO `event_speakers` (`id`, `event_app_id`, `name`, `avatar`, `company`, `position`, `bio`, `email`, `phone`, `web`, `linkedin`, `facebook`, `twitter`, `instagram`, `country`, `language`, `created_at`, `updated_at`) VALUES
        (1, 1, 'Speaker 1', 'organizer/organizer-avatars/67dbce53f0c37.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:14:11', '2025-03-20 03:14:11'),
        (2, 2, 'Speaker 1', 'organizer/organizer-avatars/67dbce7569275.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:14:45', '2025-03-20 03:14:45'),
        (3, 2, 'Speaker 2', 'organizer/organizer-avatars/67dbce8a3ac3a.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-20 03:15:06', '2025-03-20 03:15:06')");

        $this->command->info('  2. Sample Speakers Created');

        //Event Plateform
        DB::statement("INSERT INTO `event_platforms` (`id`, `event_app_id`, `type`, `name`, `created_at`, `updated_at`) VALUES
        (1, 2, 'Stage', 'MAIN STAGE', '2025-03-20 03:32:48', '2025-03-20 03:32:48')");

        $this->command->info('  3. Sample Event Platforms Created');

        //Even Dates
        DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
        (1, 2, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");
        DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
        (2, 2, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");

        $this->command->info('  4. Sample Event Dates Created');

        //Sessions
        DB::statement("INSERT INTO `event_sessions` (`id`, `event_app_id`, `event_speaker_id`, `event_platform_id`, `event_date_id`, `name`, `type`, `description`, `capacity`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
        (1, 2, 2, 1, 1, 'Session 1', 'Workshop', 'test session 1', 100, '00:00:00', '00:00:00', '2025-03-20 03:16:16', '2025-03-20 03:16:16'),
        (2, 2, 3, 1, 1, 'Session 2', 'Workshop', 'test session 2', 150, '00:00:00', '00:00:00', '2025-03-20 03:16:36', '2025-03-20 03:16:36')");

        $this->command->info('  5. Sample Event Sessions Created');

        //Tickets
        DB::statement("INSERT INTO `event_app_tickets` (`id`, `event_app_id`, `name`, `description`, `type`, `base_price`, `addons_price`, `total_price`, `increment_by`, `increment_rate`, `increment_type`, `start_increment`, `end_increment`, `created_at`, `updated_at`) VALUES
        (1, 2, 'Normal Ticket', 'test ticket', 'NORMAL', '35.00', 0, 0, '23.00', '34.00', 'Percentage', '2025-03-20', '2025-03-22', '2025-03-20 03:18:14', '2025-03-20 03:18:14'),
        (2, 2, 'VIP Ticket', 'test desc', 'NORMAL', '96.00', 0, 0, '23.00', '32.00', 'Percentage', '2025-03-20', '2025-03-20', '2025-03-20 03:18:56', '2025-03-20 03:18:56');");


        DB::statement("INSERT INTO `session_ticket` (`event_app_ticket_id`, `event_session_id`, `created_at`, `updated_at`) VALUES
        (1, 1, NULL, NULL),
        (1, 2, NULL, NULL),
        (2, 1, NULL, NULL),
        (2, 2, NULL, NULL)");

        $this->command->info('  6. Sample Event Tickets Created');

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

        $this->command->info('  7. Sample Promo Codes Created');

        DB::statement("INSERT INTO `organizer_payment_keys` (`id`, `user_id`, `stripe_publishable_key`, `stripe_secret_key`, `paypal_pub`, `paypal_secret`, `created_at`, `updated_at`) VALUES
        (1, 2, 'pk_test_51Py6kWHInNTlTUGPM5l30Odo4AOb48C48enPnOsKrw9xhueHWeYlC0lpnRRvtbwMNosFC3UWEZY4c48MsuohS5F700Lyxn0hSm', 'eyJpdiI6Ik9PYlUrckxkUGxaVjVhWmtNT2FsZ0E9PSIsInZhbHVlIjoiUXV1RFBwNUVEMG0yME03MEpjMmF1bzU3Z3IwSXJ2Und2ZXh4WXpacHhYRFp2TDhVdHFrb1o5ZEtSeUgrSFRHcWRHRHYzU1oxNXNJTXV4cnpOWXB4Y0pudytibDd0TTZFd052RGxPRXZVMzVQQ05uLzVkVTZnSEkzTVpWa21iYlRXK0VzMlpiVmk1MThGeGoxV29NdkFKQnhIWnZlU0NFUmlJQ0hSalNzRTJBPSIsIm1hYyI6ImUwODY3ZmRkYTdmNWUzZDdlMzhhYzg1MGFmMzUxODk2OGQwZDUzNjAwYWI5NTlhNGMwNDJjN2M5ZGNiOThlZWEiLCJ0YWciOiIifQ==', NULL, 'eyJpdiI6IkZOOGRWYm9OelEwWmgzcTdrVjdRYnc9PSIsInZhbHVlIjoiMkc3SlNlZUQ0cHVNOXAwSUZueWJYdz09IiwibWFjIjoiNGU2MDk5MTFhZTg1NTYzMzI1ZWY1YjBmMDUzMzEyMzBiMTYzMDJjN2MwYjdhNjc1NWZlNDUyNzc4Y2MxNjA4MSIsInRhZyI6IiJ9', '2025-03-20 23:47:39', '2025-03-20 23:48:26')
        ");

        $this->command->info('  8. Stripe Keys Created');

        DB::statement("INSERT INTO `ticket_features` (`id`, `organizer_id`, `event_app_id`, `name`, `created_at`, `updated_at`, `price`, `qty_total`, `qty_sold`) VALUES
        (1, 2, 2, '<p>🎟 <strong>VIP Access</strong> – Skip the lines and enjoy priority seating. <i>(+ $20)</i></p>', '2025-03-21 00:23:49', '2025-03-21 00:23:49', '20.00', 50, 0),
        (2, 2, 2, '<p>🍔 <strong>Food &amp; Drinks Voucher</strong> – Redeem for a meal and beverage at any vendor. <i>(+ $15)</i></p>', '2025-03-21 00:33:08', '2025-03-21 00:33:08', '15.00', 25, 0),
        (3, 2, 2, '<p>👕 <strong>Event Merchandise</strong> – Get an exclusive event T-shirt and souvenirs. <i>(+ $25)</i></p>', '2025-03-21 00:33:54', '2025-03-21 00:33:54', '25.00', 50, 0),
        (4, 2, 2, '<p>🎉 <strong>Backstage Pass</strong> – Meet the performers and enjoy a behind-the-scenes tour. <i>(+ $50)</i></p>', '2025-03-21 00:34:15', '2025-03-21 00:34:15', '50.00', 50, 0),
        (5, 2, 2, '<p>📸 <strong>Photo Package</strong> – Receive professional event photos as a keepsake. <i>(+ $10)</i></p>', '2025-03-21 00:34:39', '2025-03-21 00:34:39', '10.00', 50, 0)");

        $this->command->info('  9. Ticket Features Created');

        $this->command->info('Sample Event Data Seeded Successfully');
    }
}
