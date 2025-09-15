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
        Schema::create('event_booth_purchases', function (Blueprint $table) {
            $table->id();
            // Who bought what (and for which event app)
            $table->foreignId('event_app_id')->nullable()
                ->constrained('event_apps')->cascadeOnDelete();
            $table->foreignId('event_booth_id')
                ->constrained('event_booths')->cascadeOnDelete();
            $table->foreignId('attendee_id')->nullable()
                ->constrained('attendees')->cascadeOnDelete();
            $table->unsignedInteger('amount')->nullable();
            $table->string('currency', 3)->nullable()->index();
            // Payment details
            $table->string('status', 20)->default('pending');
            $table->string('payment_intent_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_booth_purchases');
    }
};
