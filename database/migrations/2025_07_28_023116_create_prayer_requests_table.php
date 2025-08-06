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
        Schema::create('prayer_requests', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('event_app_id');
            $table->unsignedBigInteger('attendee_id');

            $table->string('request_type')->nullable(); // e.g., 'public' or 'private'
            $table->string('status')->default('pending'); // e.g., 'pending', 'approved', 'rejected'
            $table->integer('count')->default(0); // Optional usage: views, responses, etc.

            $table->longText('message'); // Prayer request content

            $table->timestamps();

            $table->foreign('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
            $table->foreign('attendee_id')->references('id')->on('attendees')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prayer_requests');
    }
};
