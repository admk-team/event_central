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
        Schema::create('attendee_transfered_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained('event_apps')->onDelete('cascade');
            $table->string('email')->nullable();
            $table->enum('payment_method', ['stripe', 'paypal', 'free', 'cash', 'others']);
            $table->string('stripe_intent')->nullable();
            $table->foreignId('attendee_purchased_ticket_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_app_ticket_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('bt_attendee_payment_id')->nullable()->constrained('attendee_payments')->cascadeOnDelete();
            $table->foreignId('at_attendee_payment_id')->nullable()->constrained('attendee_payments')->cascadeOnDelete();
            $table->foreignId('bt_attendee_id')->nullable()->constrained('attendees')->cascadeOnDelete();
            $table->foreignId('at_attendee_id')->nullable()->constrained('attendees')->onDelete('cascade');
            $table->enum('transfer_status', ['pending', 'done']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_transfered_tickets');
    }
};
