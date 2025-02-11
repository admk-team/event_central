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
        Schema::create('attendees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id');
            $table->foreign('event_app_id')->references('id')->on('event_apps');
            $table->unsignedBigInteger('event_pass');
            $table->foreign('event_pass')->references('id')->on('event_app_passes');
            $table->string('name');
            $table->string('avatar');
            $table->string('email');
            $table->string('phone');
            $table->string('qr_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendees');
    }
};
