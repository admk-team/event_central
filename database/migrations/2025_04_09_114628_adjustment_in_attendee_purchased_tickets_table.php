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
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->dropColumn(['discount_code', 'discount', 'subTotal']);
            $table->decimal('fees_sub_total')->nullable()->after('price');
            $table->decimal('addons_sub_total')->nullable()->after('fees_sub_total');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_purchased_tickets', function (Blueprint $table) {
            $table->string('discount_code')->nullable()->after('qty');
            $table->decimal('discount')->nullable()->after('price');
            $table->decimal('subTotal')->nullable()->after('discount');
            $table->dropColumn(['fees_sub_total', 'addons_sub_total']);
        });
    }
};
