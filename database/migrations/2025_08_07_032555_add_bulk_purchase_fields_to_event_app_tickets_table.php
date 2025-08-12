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
        Schema::table('event_app_tickets', function (Blueprint $table) {
            $table->boolean('bulk_purchase_status')->default(false);
            $table->enum('bulk_purchase_discount_type', ['fixed', 'percentage'])->default('fixed');
            $table->unsignedDecimal('bulk_purchase_discount_value')->nullable();
            $table->integer('bulk_purchase_qty')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_app_tickets', function (Blueprint $table) {
              $table->dropColumn([
                'bulk_purchase_status',
                'bulk_purchase_discount_type',
                'bulk_purchase_discount_value',
                'bulk_purchase_qty'
            ]);
        });
    }
};
