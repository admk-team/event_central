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
        Schema::table('questions', function (Blueprint $table) {
            $table->string('user_type')->nullable()->after('user_id');
        });
        Schema::table('answers', function (Blueprint $table) {
            $table->string('user_type')->nullable()->after('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('user_type');
        });
        Schema::table('answers', function (Blueprint $table) {
            $table->dropColumn('user_type');
        });
    }
};
