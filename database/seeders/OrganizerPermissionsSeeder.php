<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrganizerPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public static $permissions = [
        // Event Management
        'view_events',
        'create_events',
        'edit_events',
        'delete_events',
        'scan_events',

        // Users
        'view_users',
        'create_users',
        'edit_users',
        'delete_users',

        // Roles
        'view_roles',
        'create_roles',
        'edit_roles',
        'delete_roles',

        // Payments Settings
        'edit_payment_settings',

        // Live Stream Settings
        'edit_live_stream_settings',

        // Event Dashboard
        'view_event_dashboard',

        // Event Sessions
        'view_event_sessions',
        'create_event_sessions',
        'edit_event_sessions',
        'delete_event_sessions',
        'scan_event_sessions',

        // Event Platforms
        'view_locations',
        'create_locations',
        'edit_locations',
        'delete_locations',

        // Speakers
        'view_speakers',
        'create_speakers',
        'edit_speakers',
        'delete_speakers',

        // Partner
        'view_partner',
        'create_partner',
        'edit_partner',
        'delete_partner',

        // Tickets
        'view_tickets',
        'create_tickets',
        'edit_tickets',
        'delete_tickets',
        'assign_tickets',

        // Posts
        'view_posts',
        'create_posts',
        'edit_posts',
        'delete_posts',

        // Attendees
        'view_attendees',
        'create_attendees',
        'edit_attendees',
        'delete_attendees',

        // Registration Form
        'edit_registration_form',

        // Session Attendence
        'view_session_attendence',
        'delete_session_attendence',

        // Website
        'view_website',
        'edit_website',

        // Questionnaire Form
        'edit_questionnaire_form',
        'questionnaire_response',
        'delete_questionnaire_response',

        // Email Compain
        'view_email_campaign',
        'create_email_campaign',
        'edit_email_campaign',
        'delete_email_campaign',

        // Default Email Template
        'view_default_email_template',
        'create_default_email_template',
        'edit_default_email_template',
        'delete_default_email_template',

        // Email Template
        'view_email_template',
        'create_email_template',
        'edit_email_template',
        'delete_email_template',

        // Payments
        'view_payments',

        // Badges
        'print_badges',
        'refund_ticket',

        // Chat
        'view_chat',

        // Referral links
        'view_referral_link',
        'create_referral_link',
        'edit_referral_link',
        'delete_referral_link',
        // Addons
        'scan_addons',

        //promo_code
        'view_promo_code',
        'create_promo_code',
        'delete_promo_code',
        'edit_promo_code',
        //_add_on
        'view_add_on',
        'create_add_on',
        'delete_add_on',
        'edit_add_on',
        //_ticket_fee
        'view_ticket_fee',
        'create_ticket_fee',
        'delete_ticket_fee',
        'edit_ticket_fee',
        //_event_badge
        'view_event_badge',
        'create_event_badge',
        'delete_event_badge',
        'edit_event_badge',
        //Reports
        'view_attendees_report',

        //contact forms
        'view_contact_form',
        'delete_contact_form',

        //Reports section
        'view_attendee_report',
        'view_session_report',
        'view_ticket_report',
        'view_refund_ticket_report',

        // //Prayer Request
        // 'view_prayer_request',
        // 'edit_prayer_request',
        // 'delete_prayer_request',

        'view_private_registration',
        'delete_private_registration',

        // Live Streams
        'view_live_streams',
        'create_live_streams',
        'edit_live_streams',
        'delete_live_streams',

        // Event store product
        'view_product',
        'create_product',
        'edit_product',
        'delete_product',

        //Event store order
        'view_orders',
        'delete_orders',

        //demo graphic detail
        'view_demographic_detail',

        //Event booth
        'view_event_booth',
        'create_event_booth',
        'edit_event_booth',
        'delete_event_booth',
    ];

    public function run(): void
    {
        foreach (self::$permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission, 'panel' => 'organizer']);
        }
    }

    public static function getPermissions()
    {
        return Permission::whereIn('name', static::$permissions)->where('panel', 'organizer')->get();
    }
}
