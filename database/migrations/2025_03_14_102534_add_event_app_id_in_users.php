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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('event_platform_id')->nullable()->after('parent_id');
            $table->foreign('event_platform_id')->references('id')->on('event_platforms')->onDelete('cascade');
            $table->unsignedBigInteger('event_app_id')->nullable()->after('event_platform_id');
            $table->foreign('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['event_platform_id']);
            $table->dropForeign(['event_app_id']);
            $table->dropColumn(['event_platform_id', 'event_app_id']);
        });
    }
};
