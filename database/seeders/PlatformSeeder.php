<?php

namespace Database\Seeders;

use App\Models\PlatForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PlatForm::updateOrCreate([
            'name' => 'Stage',
        ]);
        PlatForm::updateOrCreate([
            'name' => 'Room',
        ]);
    }
}
