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
        Schema::create('event_apps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organizer_id');
            $table->foreign('organizer_id')->references('id')->on('users')->cascadeOnDelete();
            $table->unsignedBigInteger('regis_page_id');
            $table->foreign('regis_page_id')->references('id')->on('registration_pages');
            // $table->string('information');
            $table->string('name');
            $table->longText('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('location_type');
            $table->string('location_base');
            $table->string('type');
            $table->enum('schedual_type', ['singleday', 'multiday', 'recurring']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_apps');
    }
};
