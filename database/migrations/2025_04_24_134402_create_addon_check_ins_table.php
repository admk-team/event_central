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
        Schema::create('addon_check_ins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attendee_id');
            $table->foreign('attendee_id')->references('id')->on('attendees')->cascadeOnDelete();
            $table->unsignedBigInteger('addon_id');
            $table->foreign('addon_id')->references('id')->on('addons')->cascadeOnDelete();
            $table->dateTime('checked_in');
            $table->string('qr_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addon_check_ins');
    }
};
