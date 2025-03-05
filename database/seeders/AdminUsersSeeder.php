<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@gmail.com')->first();
        if (! $user) {
            $user = User::create([
                "name" => "SuperAdmin", 
                "email" => "admin@gmail.com", 
                "role" => "admin", 
                "password" => Hash::make('12345678'), 
                "email_verified_at" => now()
            ]);
        }

        setPermissionsTeamId(null);
        
        $user->syncRoles(['superadmin']);
    }
}
