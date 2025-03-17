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
        Schema::table('event_posts', function (Blueprint $table) {
            $table->text('post_poll')->nullable();
            $table->integer('likes')->nullable()->default(0);
            $table->integer('dis_likes')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_posts', function (Blueprint $table) {
            $table->text('post_poll')->nullable();
            $table->integer('likes')->nullable()->default(0);
            $table->integer('dis_likes')->nullable()->default(0);
        });
    }
};
