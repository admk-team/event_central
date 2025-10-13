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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id');
            $table->unsignedBigInteger('user_id')->nullable(); // if you have buyers logged in
            $table->string('status')->default('pending'); // pending, paid, shipped, cancelled
            $table->decimal('total_amount', 10, 2);
            $table->string('stripe_id')->nullable();
            $table->string('stripe_intent')->nullable();
            $table->string('payment_method')->nullable();
            $table->timestamps();
            $table->foreign('event_app_id')
                ->references('id')
                ->on('event_apps')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('attendees')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
