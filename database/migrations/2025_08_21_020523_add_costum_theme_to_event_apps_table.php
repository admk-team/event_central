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
        Schema::table('event_apps', function (Blueprint $table) {
            $table->string('custom_theme')->default('default')->after('schedual_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_apps', function (Blueprint $table) {
            $table->dropColumn('custom_theme');
        });
    }
};
