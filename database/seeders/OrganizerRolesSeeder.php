<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class OrganizerRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadmin = Role::updateOrCreate(['name' => 'owner', 'panel' => 'organizer']);
        $superadmin->syncPermissions(OrganizerPermissionsSeeder::$permissions);
    }
}
