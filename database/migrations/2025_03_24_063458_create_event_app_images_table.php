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
        Schema::create('event_app_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->cascadeOnDelete();
            $table->string('image_file_name')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_feature_image')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_images');
    }
};
