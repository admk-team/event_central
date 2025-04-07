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
        Schema::table('event_posts', function (Blueprint $table) {
            $table->unsignedBigInteger('session_id')->after('event_app_id');
            $table->foreign('session_id')->references('id')->on('event_sessions')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_posts', function (Blueprint $table) {
            $table->dropColumn('session_id');
        });
    }
};
