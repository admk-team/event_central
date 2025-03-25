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
        Schema::create('registration_pages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('form_id');
            $table->foreign('form_id')->references('id')->on('registration_forms');
            $table->unsignedBigInteger('color_scheme_id');
            $table->foreign('color_scheme_id')->references('id')->on('color_schemes');
            $table->string('branding_options')->nullable();
            $table->string('event_logo')->nullable();
            $table->string('banner')->nullable();
            $table->string('custom_url')->nullable();
            $table->boolean('public')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_pages');
    }
};
