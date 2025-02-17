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
        // Role Management
        'view_roles',
        'create_roles',
        'edit_roles',
        'delete_roles',
    ];

    public function run(): void
    {
        foreach (self::$permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission, 'guard_name' => 'organizer']);
        }
    }
}
