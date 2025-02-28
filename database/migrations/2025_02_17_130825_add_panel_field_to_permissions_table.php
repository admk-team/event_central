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
        Schema::table('permissions', function (Blueprint $table) {
            $table->string('panel')->default('admin')->after('guard_name');

            $table->dropUnique(['name', 'guard_name']);

            $table->unique(['name', 'guard_name', 'panel']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('permissions', function (Blueprint $table) {
            $table->dropUnique(['name', 'guard_name', 'panel']);

            $table->unique(['name', 'guard_name']);

            $table->dropColumn('panel');
        });
    }
};
