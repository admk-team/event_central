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
        Schema::create('event_sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id');
            $table->foreign('event_app_id')->references('id')->on('event_apps');
            $table->unsignedBigInteger('event_speaker_id')->nullable();
            $table->foreign('event_speaker_id')->references('id')->on('event_speakers');
            $table->string('name');
            $table->enum('type', ['Lecture', 'Workshop', 'Break']);
            $table->string('description');
            $table->integer('capacity');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_sessions');
    }
};
