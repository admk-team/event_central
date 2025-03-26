<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Admin
            AdminPermissionsSeeder::class,
            AdminRolesSeeder::class,
            AdminUsersSeeder::class,
            AdminRecurringTypeSeeder::class,
            AdminEventAppCategorySeeder::class,

            // Organizer
            OrganizerPermissionsSeeder::class,
            OrganizerRolesSeeder::class,
            OrganizerUsersSeeder::class,

            // Platforms
            PlatformSeeder::class,
            SampleEventDataSeeder::class,

            //Inser a complet set of Event, Session, Tickets etc.
            //SampleEventDataSeeder::class
        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // $sadmin = User::create(["name" => "Admin", "email" => "admin@themesbrand.com", "role" => "admin", "password" => Hash::make(12345678), "email_verified_at" => now()]);

        // $role = Role::create(['name' => 'Superadmin']);
        // $role1 = Role::create(['name' => 'Admin']);

        // $permission1 = Permission::create(['name' => 'Admin UserManagement']);
        // $permission2 = Permission::create(['name' => 'Role Management']);

        // $role->givePermissionTo($permission1);
        // $role->givePermissionTo($permission2);

        // $role1->givePermissionTo($permission1);
        // $role1->givePermissionTo($permission2);

        // $sadmin->assignRole([$role->id]);
    }
}
