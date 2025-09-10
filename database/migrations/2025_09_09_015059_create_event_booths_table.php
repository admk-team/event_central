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
        Schema::create('event_booths', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id')->nullable();
            $table->unsignedBigInteger('attendee_id')->nullable();
            $table->foreign('attendee_id')->references('id')->on('attendees')->onDelete('cascade');
            $table->foreign('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('number')->nullable();
            // New columns
            $table->string('status')->default('available'); // default: available
            $table->string('logo')->nullable();      
            $table->string('type', 20)->default('booth'); // booth | sponsor | banner       // store path or filename
            $table->unsignedInteger('price')->nullable();   // store price in points

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_booths');
    }
};
