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
        Schema::create('event_app_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->mediumText('description');
            $table->string('type')->default('Normal');
            $table->decimal('price')->default(0);
            $table->json('addon_features')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_tickets');
    }
};
