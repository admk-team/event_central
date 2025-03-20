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
        Schema::create('feature_ticket', function (Blueprint $table) {
            $table->foreignId('event_app_ticket_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ticket_feature_id')->constrained()->cascadeOnDelete();
            $table->primary(['event_app_ticket_id', 'ticket_feature_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_ticket');
    }
};
