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
            $table->string('refund_type');
            $table->string('refund_reason');
            $table->string('organizer_remarks')->nullable();
            $table->dateTime('refund_requested_on')->nullable();
            $table->dateTime('refund_status_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_refund_tickets', function (Blueprint $table) {
            $table->dropColumn(['refund_type', 'refund_reason', 'organizer_remarks', 'refund_requested_on', 'refund_status_date']);
        });
    }
};
