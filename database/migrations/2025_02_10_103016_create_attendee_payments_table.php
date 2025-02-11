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
        Schema::create('attendee_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_pass_id');
            $table->foreign('event_pass_id')->references('id')->on('event_app_passes');
            $table->unsignedBigInteger('attendee_id');
            $table->foreign('attendee_id')->references('id')->on('attendees');
            $table->enum('payment_method', ['stripe', 'paypal']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_payments');
    }
};
