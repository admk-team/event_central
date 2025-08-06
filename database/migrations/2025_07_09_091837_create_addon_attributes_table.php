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
        Schema::create('addon_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('addon_id')->constrained()->onDelete('cascade');
            $table->foreignId('attribute_id')->nullable()->default(null)->constrained()->onDelete('set null');
            $table->string('name')->nullable()->default(null);
            $table->enum('type', ['global', 'custom'])->default('global');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addon_attributes');
    }
};
