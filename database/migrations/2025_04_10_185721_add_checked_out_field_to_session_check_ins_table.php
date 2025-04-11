<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('session_check_ins', function (Blueprint $table) {
            $table->dateTime('checked_out')->nullable()->default(null)->after('checked_in');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('session_check_ins', function (Blueprint $table) {
            $table->dropColumn('checked_out');
        });
    }
};
