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
            $table->unsignedBigInteger('event_date_id')->nullable();
            $table->string('name')->nullable();
            $table->enum('type', ['Lecture', 'Workshop', 'Break']);
            $table->string('description')->nullable();
            $table->integer('capacity')->nullable();
            $table->boolean('qa_status')->default(false);
            $table->time('start_time')->default('00:00:00');
            $table->time('end_time')->default('00:00:00');
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
