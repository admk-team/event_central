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
        Schema::table('transfer_tickets', function (Blueprint $table) {
            $table->boolean('transfered')->default(false)->after('transfer_email');
            $table->unsignedBigInteger('attendee_payment_transfered')
                ->nullable()
                ->after('transfered');
            $table->foreign('attendee_payment_transfered')
                ->references('id')
                ->on('attendee_purchased_tickets')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transfer_tickets', function (Blueprint $table) {
            //
        });
    }
};
