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
        Schema::create('event_app_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_app_id')->nullable()->constrained()->onDelete('cascade');

            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('fee_amount', 8, 2)->default(0);
            $table->enum('fee_type', ['flat', 'percentage'])->default('flat');
            $table->enum('status', ['active', 'in-active'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_app_fees');
    }
};
