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
        Schema::create('attendee_purchased_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_ticket_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('qty')->default(0);
            $table->string('discount_code')->nullable();
            $table->decimal('price')->default(0);;
            $table->decimal('discount')->default(0);;
            $table->decimal('subTotal')->default(0);;
            $table->decimal('total')->default(0);;
            $table->timestamps();
            $table->foreignId('attendee_payment_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_purchased_tickets');
    }
};
