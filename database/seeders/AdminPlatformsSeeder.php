<?php

namespace Database\Seeders;

use App\Models\PlatForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminPlatformsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PlatForm::updateOrCreate(['name' => 'workshop']);
        PlatForm::updateOrCreate(['name' => 'room']);
        PlatForm::updateOrCreate(['name' => 'stage']);
    }
}
