<?php

namespace Database\Seeders;

use App\Models\Attendee;
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

        try {
            //Events
            DB::statement("INSERT INTO `event_apps` (`id`, `uuid`, `organizer_id`, `name`, `logo`, `description`, `location_type`, `location_base`, `type`, `schedual_type`, `created_at`, `updated_at`, `event_app_category_id`, `is_recurring`, `recurring_type_id`) VALUES
            (1, '9e79c502-1a50-4d01-bd0b-9f73db250cc9', 2, 'Kids & Family', 'events-avatars/event-logo-1.png', 'test', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:14', '2025-03-20 03:12:14', 1, 0, NULL),
            (2, '9e79c52f-7abb-4277-b7d5-771cf8f3fd7b', 2, 'octv localhsot', 'events-avatars/event-logo-2.jpg', 'test event 2', 'test', 'test', 'in-person', 'singleday', '2025-03-20 03:12:44', '2025-03-20 03:12:44', 2, 1, 1)");
    
            // DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
            // (1, 2, '2025-03-20', '2025-03-19 22:35:19', '2025-03-19 22:35:19'),
            // (2, 2, '2025-03-20', '2025-03-19 22:35:19', '2025-03-19 22:35:19')");
    
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
    
            // //Even Dates
            DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
            (1, 1, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");
            DB::statement("INSERT INTO `event_app_dates` (`id`, `event_app_id`, `date`, `created_at`, `updated_at`) VALUES
            (2, 2, '2025-03-20', '2025-03-20 03:35:19', '2025-03-20 03:35:19')");
    
            $this->command->info('  4. Sample Event Dates Created');
    
            //Sessions
            DB::statement("INSERT INTO `event_sessions` (`id`, `event_app_id`, `event_speaker_id`, `event_platform_id`, `event_date_id`, `name`, `type`, `description`, `capacity`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
            (1, 2, 2, 1, 1, 'Session 1', 'Workshop', 'test session 1', 100, '00:00:00', '00:00:00', '2025-03-20 03:16:16', '2025-03-20 03:16:16'),
            (2, 2, 3, 1, 1, 'Session 2', 'Workshop', 'test session 2', 150, '00:00:00', '00:00:00', '2025-03-20 03:16:36', '2025-03-20 03:16:36')");
    
            $this->command->info('  5. Sample Event Sessions Created');
    
            //Tickets
            DB::statement("INSERT INTO `event_app_tickets` (`id`, `event_app_id`, `name`, `description`, `type`, `base_price`,  `increment_by`, `increment_rate`, `increment_type`, `start_increment`, `end_increment`, `created_at`, `updated_at`) VALUES
            (1, 2, 'Normal Ticket', 'test ticket', 'NORMAL', '35.00', '23.00', '34.00', 'Percentage', '2025-03-20', '2025-03-22', '2025-03-20 03:18:14', '2025-03-20 03:18:14'),
            (2, 2, 'VIP Ticket', 'test desc', 'NORMAL', '96.00', '23.00', '32.00', 'Percentage', '2025-03-20', '2025-03-20', '2025-03-20 03:18:56', '2025-03-20 03:18:56');");
    
    
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
    
            DB::statement("INSERT INTO `organizer_payment_keys` (`id`, `user_id`, `stripe_publishable_key`, `stripe_secret_key`, `paypal_base_url`, `paypal_pub`, `paypal_secret`, `created_at`, `updated_at`) VALUES
            (1, 2, 'pk_test_51R3iHCPNcWTtCzebbzvUsG7XMmMnTqUxbs4NE9v8CH5IJxtaMXDgz5FMA96HnS93ZQw9DN6wHLlxgtFW90XW0Q4z004QlcW5Z8', 'eyJpdiI6ImlDNE52MDVSREpwNUFCa2ttWTAyN1E9PSIsInZhbHVlIjoiWGJMd2xYZjl6bmRVbXdvWi9Yc0hPaEc3Z3Zxa1hHc3FEdFZzK1FweXk4aHg3ZmFrNVdlQ29BbDM2Nm5wdnJPSnBjc1UxUWpOZjdMaFFaWjlBTVQrSEFjZldka3JnQ1paK1puQmRMd0loQUJQb21uSXc4c1F6RGdzRTJoSTRhU0VySjBqVGU5eGVubkxsbFFsd0Z0RGNNRUI3MDIzb2pFeUxVWEhJREsrUktnPSIsIm1hYyI6IjZiNzBiNzczZjYxNmEyNDJlZTQ5YjFjOTMxN2QzYTcyOTYwYzY5M2ZlNTJiOGY5NmJhMDZhYTkyZGEwMjNkMmIiLCJ0YWciOiIifQ==', 'https://api-m.sandbox.paypal.com', 'AarFoaRqHBfyzdXvqagFqjOF4RPsxuRYmmkpP1WTroOsRYUeixH-3w8LwxHcZkmWO7ow1OI_Ei2F7lnw', 'eyJpdiI6IlNxWHRqSHQ5SEVYNUo0dmxNTjJ0c1E9PSIsInZhbHVlIjoiWmJ3MHVKbGQxSlFDVU96cUFkUkFnczYxUG1iTExwd0JLdUtHdWtCaFZHZXllb0tNZVdVK0ZrNjBCOHNIRFE1YmtkWnc5L2E4UEI3VHdiUUdXc3hBVjlCQVhibHFxRDRNdEljeHdTbGoxL2hsQWJJN0pKWTY5VnpQeVlydEVpQkgiLCJtYWMiOiI3NmEzZWUyODgzMTEyMGNlNDE3OGNmZmE4N2ZkMTg3YjJjYTgzYjI0ZGNkNTVkOWNiMzJmZTM4YWQ2MTY2ZDY4IiwidGFnIjoiIn0=', '2025-03-20 18:47:39', '2025-03-25 11:53:45')");
    
            $this->command->info('  8. Stripe Keys Created');
    
            DB::statement("INSERT INTO `addons` (`id`, `organizer_id`, `event_app_id`, `name`, `price`, `qty_total`, `qty_sold`, `created_at`, `updated_at`) VALUES
            (1, 2, 2, 'Walk the red carpet', 0.00, 50, 0, '2025-03-27 11:35:31', '2025-03-27 11:35:31'),
            (2, 2, 2, 'Sign up for the Pitch-A-Thon', 0.00, 100, 0, '2025-03-27 11:35:48', '2025-03-27 11:35:48'),
            (3, 2, 2, 'Sign up to sit in the Audition Room (Filmmaker)', 0.00, 10, 0, '2025-03-27 11:36:05', '2025-03-27 11:36:05'),
            (4, 2, 2, 'Sign up to Audition (Actor/Actress)', 10.00, 10, 0, '2025-03-27 11:36:22', '2025-03-27 11:36:22'),
            (5, 2, 2, 'Need Airport Pickup and Drop-off', 15.00, 12, 0, '2025-03-27 11:36:39', '2025-03-27 11:36:39'),
            (6, 2, 2, 'After Party', 0.00, 12, 0, '2025-03-27 11:36:52', '2025-03-27 11:36:52'),
            (7, 2, 2, 'CFF Academy (Wednesday & Thursday)', 125.00, 15, 0, '2025-03-27 11:37:20', '2025-03-27 11:37:20'),
            (8, 2, 2, 'ICFF Music Academy', 0.00, 13, 0, '2025-03-27 11:37:34', '2025-03-27 11:37:34')");
    
            DB::statement("INSERT INTO `addon_event_app_ticket` (`event_app_ticket_id`, `addon_id`, `created_at`, `updated_at`) VALUES
            (1, 1, NULL, NULL),
            (1, 2, NULL, NULL),
            (1, 3, NULL, NULL),
            (1, 4, NULL, NULL),
            (1, 5, NULL, NULL),
            (1, 6, NULL, NULL),
            (1, 7, NULL, NULL),
            (1, 8, NULL, NULL),
            (2, 1, NULL, NULL),
            (2, 2, NULL, NULL),
            (2, 3, NULL, NULL),
            (2, 4, NULL, NULL),
            (2, 5, NULL, NULL),
            (2, 6, NULL, NULL),
            (2, 7, NULL, NULL),
            (2, 8, NULL, NULL)");
    
    
            $this->command->info('  9. Addons Created');
    
            Attendee::create([
                'email' => 'ansar@gmail.com',
                'password' => '$2y$12$ORw4GwYHv/ne/0ckSIew6ecx4BxCc8bBZqNYdMTjbpqX441PgJuYO',
                'event_app_id' => 2,
                'first_name' => 'Ansar',
                'last_name' => 'Khan',
                'type' => 'anonymous'
            ]);
    
            $this->command->info('  10. Sample Attendee Created');
    
            $this->command->info('Sample Event Data Seeded Successfully');
        } catch(\Exception $e) {
            $this->command->error('Error while seeding sample event data, ');
        }
    }
}
