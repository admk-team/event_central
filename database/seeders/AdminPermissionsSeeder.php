<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminPermissionsSeeder extends Seeder
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

        // Organizer Management
        'view_organizers',
        'create_organizers',
        'edit_organizers',
        'delete_organizers',
    ];

    public function run(): void
    {
        foreach (self::$permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission, 'panel' => 'admin']);
        }
    }
}
