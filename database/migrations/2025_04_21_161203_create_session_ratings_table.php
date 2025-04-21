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
        Schema::create('session_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendee_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('event_session_id')->nullable()->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('rating')->nullable();
            $table->longText('rating_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_ratings');
    }
};
