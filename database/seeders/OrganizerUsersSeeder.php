<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OrganizerUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'organizer@gmail.com')->first();
        if (! $user) {
            $user = User::create(["name" => "Organizer",
                "email" => "organizer@gmail.com",
                "role" => "organizer",
                "password" => Hash::make('12345678'),
                "email_verified_at" => now()
            ]);
        }

        $user->assignRole('owner');
    }
}
