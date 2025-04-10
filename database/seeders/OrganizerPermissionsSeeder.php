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

        // Event Dashboard
        'view_event_dashboard',

        // Event Sessions
        'view_event_sessions',
        'create_event_sessions',
        'edit_event_sessions',
        'delete_event_sessions',
        'scan_event_sessions',

        // Event Platforms
        'view_platforms',
        'create_platforms',
        'edit_platforms',
        'delete_platforms',

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
