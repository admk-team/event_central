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
            $table->decimal('original_price')->default(0)->after('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_app_tickets', function (Blueprint $table) {
            $table->dropColumn('original_price');
        });
    }
};
