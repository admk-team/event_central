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
        Schema::create('event_app_dates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->timestamps();
        });
        Schema::table('event_sessions', function (Blueprint $table) {
            $table->foreign('event_date_id')->references('id')->on('event_app_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_dates');
        Schema::table('event_sessions', function (Blueprint $table) {
            // Drop foreign key constraint
            $table->dropForeign(['event_date_id']);
        });
    }
};
