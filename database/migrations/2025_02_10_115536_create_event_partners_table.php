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
        Schema::create('event_partners', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_app_id');
            $table->foreign('event_app_id')->references('id')->on('event_apps');
            $table->enum('type', ['exhibitor', 'sponsor']);
            $table->string('company_name');
            $table->longText('description')->nullable();
            $table->string('web')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('exhibitor_logo')->nullable();
            $table->string('exhibitor_booth_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_partners');
    }
};
