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
        Schema::table('event_apps', function (Blueprint $table) {
            $table->foreignId('event_app_category_id')->constrained();
            $table->boolean('is_recurring')->default(false);
            $table->foreignId('recurring_type_id')->nullable()->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_apps', function (Blueprint $table) {
            $table->dropConstrainedForeignId('event_app_category_id');
            $table->dropConstrainedForeignId('recurring_type_id');
        });
    }
};
