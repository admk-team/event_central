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
        Schema::table('attendee_payments', function (Blueprint $table) {
            $table->unsignedBigInteger('payer_id')->nullable();
            $table->string('payer_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_payments', function (Blueprint $table) {
            $table->dropColumn(['payer_id', 'payer_type']);
        });
    }
};
