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
        Schema::create('event_app_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id');
            $table->foreign('event_app_id')->references('id')->on('event_apps');
            $table->string('stripe_pub');
            $table->string('stripe_secret');
            $table->string('paypal_pub');
            $table->string('paypal_secret');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_payments');
    }
};
