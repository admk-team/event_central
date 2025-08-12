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
        Schema::create('live_streams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
            $table->string('status'); // created, preparing, started, completed
            $table->string('stream_key');
            $table->string('live_asset_id');
            $table->string('live_video_source_id');
            $table->string('resolution');
            $table->string('stream_url');
            $table->string('playback_url');
            $table->string('recording_playback_url')->nullable()->default(null);
            $table->string('thumbnail')->nullable()->default(null);
            $table->dateTime('start_time')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_streams');
    }
};
