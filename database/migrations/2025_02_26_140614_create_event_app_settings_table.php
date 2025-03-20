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
        Schema::create('event_app_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->onDelete('cascade');
            $table->string('key');
            $table->text('value')->nullable()->default(null);
            $table->string('type')->default('string'); // string, boolean, number, json
            $table->string('group')->nullable();
            $table->text('description')->nullable()->default(null);
            $table->timestamps();

            $table->index(['event_app_id', 'group']);
            $table->unique(['event_app_id', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_settings');
    }
};
