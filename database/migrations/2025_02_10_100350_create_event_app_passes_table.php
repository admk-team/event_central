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
        Schema::create('event_app_passes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_session_id');
            $table->foreign('event_session_id')->references('id')->on('event_sessions');
            $table->string('name');
            $table->longText('description');
            $table->string('type');
            $table->decimal('price');
            $table->decimal('increament_by');
            $table->decimal('increament_rate');
            $table->date('start_increament');
            $table->date('end_increament');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_passes');
    }
};
