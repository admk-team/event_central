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
            $table->string('attendee_name')->nullable()->after('code');
            $table->string('attendee_position')->nullable()->after('attendee_name');
            $table->string('attendee_location')->nullable()->after('attendee_position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->dropColumn(['attendee_name', 'attendee_position', 'attendee_location']);
        });
    }
};
