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
            $table->uuid()->unique();
            $table->foreignId('event_app_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attendee_id')->constrained()->cascadeOnDelete();
            $table->string('discount_code')->nullable();
            $table->decimal('sub_total')->default(0);
            $table->decimal('discount')->default(0);
            $table->decimal('amount_paid');
            $table->string('stripe_intent')->nullable();
            $table->enum('status', ['pending', 'paid'])->default('pending');
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
