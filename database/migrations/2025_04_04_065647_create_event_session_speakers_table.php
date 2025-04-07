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
        Schema::create('event_session_speakers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_session_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_speaker_id')->constrained('event_speakers')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['event_session_id', 'event_speaker_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_session_speakers');
    }
};
