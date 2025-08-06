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
        Schema::create('addon_attribute_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('addon_attribute_id')->constrained()->onDelete('cascade');
            $table->foreignId('attribute_option_id')->nullable()->default(null)->constrained()->onDelete('set null');
            $table->string('value')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addon_attribute_options');
    }
};
