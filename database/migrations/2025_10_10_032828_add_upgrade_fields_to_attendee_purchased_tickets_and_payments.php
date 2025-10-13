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
        // 1️⃣ Add fields to attendee_purchased_tickets
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            if (!Schema::hasColumn('attendee_purchased_tickets', 'original_ticket_price')) {
                $table->decimal('original_ticket_price', 10, 2)
                    ->nullable()
                    ->after('total')
                    ->comment('Price of the original purchased ticket before upgrade');
            }

            if (!Schema::hasColumn('attendee_purchased_tickets', 'upgrade_amount')) {
                $table->decimal('upgrade_amount', 10, 2)
                    ->nullable()
                    ->after('original_ticket_price')
                    ->comment('Additional amount paid during ticket upgrade');
            }

            if (!Schema::hasColumn('attendee_purchased_tickets', 'is_upgrade')) {
                $table->boolean('is_upgrade')
                    ->default(false)
                    ->after('upgrade_amount')
                    ->comment('Marks this record as an upgraded ticket');
            }
        });

        // 2️⃣ Add refund tracking field to attendee_payments
        Schema::table('attendee_payments', function (Blueprint $table) {
            if (!Schema::hasColumn('attendee_payments', 'is_refund_required')) {
                $table->boolean('is_refund_required')
                    ->default(false)
                    ->after('status')
                    ->comment('Indicates if a refund is required for the upgrade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->dropColumn(['original_ticket_price', 'upgrade_amount', 'is_upgrade']);
        });

        Schema::table('attendee_payments', function (Blueprint $table) {
            $table->dropColumn(['is_refund_required']);
        });
    }
};
