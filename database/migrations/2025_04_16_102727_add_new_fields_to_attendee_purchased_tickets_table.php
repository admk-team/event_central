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
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->boolean('is_transfered')->default(false);
            $table->string('transfered_to_email')->nullable();
            $table->foreignId('transfered_to_attendee_id')->nullable()->constrained('attendees')->nullOnDelete();

            $table->string('transfer_note')->nullable();
            $table->foreignId('attendee_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('event_app_id')->nullable()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {

            $table->dropConstrainedForeignId('attendee_id');
            $table->dropConstrainedForeignId('transfered_to_attendee_id');
            $table->dropColumn([
                'is_transfered',
                'transfer_note',
                'transfered_to_email',
            ]);
        });
    }
};
