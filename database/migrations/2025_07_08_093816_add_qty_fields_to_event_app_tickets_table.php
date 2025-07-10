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
            $table->integer('qty_total')->nullable()->default(null)->after('base_price');
            $table->integer('qty_sold')->default(0)->after('qty_total');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_app_tickets', function (Blueprint $table) {
            $table->dropColumn('qty_total');
            $table->dropColumn('qty_sold');
        });
    }
};
