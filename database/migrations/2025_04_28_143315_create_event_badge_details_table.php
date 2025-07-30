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
        Schema::create('event_badge_details', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->integer('achieved_points')->default(0);
            $table->unsignedBigInteger('attendee_id')->nullable();
            $table->unsignedBigInteger('event_badge_id')->nullable();
            $table->unsignedBigInteger('event_app_id')->nullable();
            $table->string('content_code')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_badge_details');
    }
};
