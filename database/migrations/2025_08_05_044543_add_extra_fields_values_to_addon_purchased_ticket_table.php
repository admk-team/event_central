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
            $table->json('extra_fields_values')->nullable()->after('addon_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addon_purchased_ticket', function (Blueprint $table) {
             $table->dropColumn('extra_fields_values');
        });
    }
};
