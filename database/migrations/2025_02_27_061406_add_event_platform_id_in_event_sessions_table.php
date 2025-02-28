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
        Schema::table('event_sessions', function (Blueprint $table) {
            $table->unsignedBigInteger('event_platform_id')->after('event_speaker_id');
            $table->foreign('event_platform_id')->references('id')->on('event_platforms')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_sessions', function (Blueprint $table) {
            $table->dropForeign(['event_platform_id']);
            $table->dropColumn('event_platform_id');
        });
    }
};
