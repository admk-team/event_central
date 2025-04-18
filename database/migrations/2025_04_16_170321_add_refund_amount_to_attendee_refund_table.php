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
        Schema::table('attendee_refund_tickets', function (Blueprint $table) {
            $table->decimal('refund_requested_amount')->default(0);
            $table->decimal('refund_approved_amount')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_refund_tickets', function (Blueprint $table) {
            $table->dropColumn(['refund_requested_amount', 'refund_approved_amount']);
        });
    }
};
