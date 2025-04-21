<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE event_apps MODIFY COLUMN schedual_type ENUM('singleday', 'multiday')");

        // Schema::table('event_apps', function (Blueprint $table) {
        //     $table->enum('schedual_type', ['singleday', 'multiday'])->change();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE event_apps MODIFY COLUMN schedual_type ENUM('singleday', 'multiday', 'recurring)");
        // Schema::table('event_apps', function (Blueprint $table) {
        //     $table->enum('schedual_type', ['singleday', 'multiday', 'recurring'])->change();
        // });
    }
};
