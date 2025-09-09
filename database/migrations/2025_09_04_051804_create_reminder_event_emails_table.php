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
        Schema::create('reminder_event_emails', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id')->nullable(); // remove ->after('id')
            $table->foreign('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
            $table->integer('days')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminder_event_emails');
    }
};
