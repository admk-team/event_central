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
        Schema::table('ticket_features', function (Blueprint $table) {
            $table->decimal('price')->default(0);
            $table->unsignedSmallInteger('qty_total');
            $table->unsignedSmallInteger('qty_sold');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_features', function (Blueprint $table) {
            $table->dropColumn(['price', 'qty_total', 'qty_sold']);
        });
    }
};
