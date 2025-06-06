<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadmin = Role::updateOrCreate(['name' => 'superadmin', 'panel' => 'admin']);
        $superadmin->syncPermissions(AdminPermissionsSeeder::getPermissions());
    }
}
