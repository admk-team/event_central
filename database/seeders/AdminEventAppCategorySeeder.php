<?php

namespace Database\Seeders;

use App\Models\EventAppCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminEventAppCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('event_app_categories')->truncate();
        $types = ['Conference', 'Workshops', 'Webinars', 'Sports'];

        foreach ($types as $type) {
            EventAppCategory::create(['name' => $type]);
        }
    }
}
