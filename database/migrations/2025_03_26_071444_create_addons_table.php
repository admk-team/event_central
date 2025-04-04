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
        Schema::create('addons', function (Blueprint $table) {
            $table->id();

            $table->foreignId('organizer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('event_app_id')->nullable()->constrained()->nullOnDelete();

            $table->string('name')->nullable();
            $table->decimal('price')->nullable()->default(0);
            $table->unsignedSmallInteger('qty_total');
            $table->unsignedSmallInteger('qty_sold');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_features');
    }
};
