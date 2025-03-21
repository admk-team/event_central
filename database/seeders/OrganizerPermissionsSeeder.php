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
        // User Management
        'view_users',
        'create_users',
        'edit_users',
        'delete_users',

        // Role Management
        'view_roles',
        'create_roles',
        'edit_roles',
        'delete_roles',

        // SCHEDULE
        'view_schedule',
        'create_schedule',
        'edit_schedule',
        'delete_schedule',
        
        // Partner
        'view_partner',
        'create_partner',
        'edit_partner',
        'delete_partner',
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
