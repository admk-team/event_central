<?php

namespace Database\Seeders;

use App\Models\RecurringType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminRecurringTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('recurring_types')->truncate();
        $types = ['Weekly', 'Monthly', 'Six Monthly', 'Yearly'];
        foreach ($types as $type) {
            RecurringType::create(['name' => $type]);
        }
    }
}
