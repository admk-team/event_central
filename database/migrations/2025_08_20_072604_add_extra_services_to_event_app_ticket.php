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
            $table->string('extra_service_name')->after('end_increment')->nullable();
            $table->json('extra_services')->after('extra_service_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_app_tickets', function (Blueprint $table) {
            $table->dropColumn('extra_service_name');
            $table->dropColumn('extra_services');
        });
    }
};
