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
        Schema::create('banner_ads',function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('attendee_id')->nullable();
                $table->unsignedBigInteger('event_app_id')->nullable();
                $table->string('name');
                $table->string('image')->nullable();
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->boolean('feature_on_homepage')->default(0);
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banner_ads');
    }
};
