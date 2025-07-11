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
        Schema::table('addons', function (Blueprint $table) {
            $table->foreignId('event_app_ticket_id')->nullable()->default(null)->constrained()->onDelete('set null')->after('event_app_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addons', function (Blueprint $table) {
            $table->dropForeign(['event_app_ticket_id']);
            $table->dropColumn('event_app_ticket_id');
        });
    }
};
