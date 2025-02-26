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
        Schema::table('event_partners', function (Blueprint $table) {
            $table->foreignId('partner_category_id')->nullable()->constrained('event_partner_categories')->onDelete('set null')->after('event_app_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_partners', function (Blueprint $table) {
            $table->dropForeign(['partner_category_id']); // Drop the foreign key constraint
            $table->dropColumn('partner_category_id'); // Drop the column
        });
    }
};
