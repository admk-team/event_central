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
        Schema::create('attendee_event_session', function (Blueprint $table) {
            $table->foreignId('attendee_id')->constrained();
            $table->foreignId('event_session_id')->constrained();
            $table->primary(['attendee_id', 'event_session_id']);
            $table->unsignedTinyInteger('rating')->nullable();
            $table->string('rating_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_event_session');
    }
};
