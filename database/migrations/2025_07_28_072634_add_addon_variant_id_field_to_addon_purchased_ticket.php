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
        Schema::table('addon_purchased_ticket', function (Blueprint $table) {
            $table->foreignId('addon_variant_id')->nullable()->default(null)->after('addon_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addon_purchased_ticket', function (Blueprint $table) {
            $table->dropColumn('addon_variant_id');
        });
    }
};
