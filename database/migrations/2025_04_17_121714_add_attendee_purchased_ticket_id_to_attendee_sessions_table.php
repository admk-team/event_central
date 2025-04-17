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

        Schema::create('attendee_event_session', function (Blueprint $table) {
            $table->foreignId('attendee_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_session_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attendee_purchased_ticket_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('attendee_payment_id')->nullable();

            $table->unsignedTinyInteger('rating')->nullable();
            $table->string('rating_description')->nullable();
            $table->timestamps();

            $table->primary([
                'attendee_id',
                'event_session_id',
                'attendee_purchased_ticket_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('attendee_event_session', function (Blueprint $table) {
            $table->dropConstrainedForeignId('attendee_purchased_ticket_id');
        });
    }
};
