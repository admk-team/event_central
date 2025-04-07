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
            $table->string('qr_code')->after('total')->nullable();
            $table->string('code')->after('qr_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->dropColumn('qr_code');
            $table->dropColumn('code');
        });
    }
};
