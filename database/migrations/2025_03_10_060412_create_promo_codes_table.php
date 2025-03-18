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
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->cascadeOnDelete();
            $table->string('code', 50);
            $table->mediumText('description');
            $table->enum('discount_type', ['fixed', 'percentage'])->default('fixed');
            $table->unsignedDecimal('discount_value');
            $table->unsignedInteger('usage_limit')->nullable();
            $table->unsignedInteger('used_count')->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['active', 'expired', 'disabled']);
            $table->timestamps();

            //Constraints
            $table->unique(['event_app_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_codes');
    }
};
