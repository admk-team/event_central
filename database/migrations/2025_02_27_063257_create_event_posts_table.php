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
        Schema::create('event_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained('event_apps');
            $table->string('title');
            $table->text('content')->nullable();
            $table->string('image')->nullable();
            $table->boolean('send_notification')->default(false);
            $table->date('sending_date')->nullable();
            $table->time('sending_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_posts');
    }
};
