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
        Schema::create('email_campaigns', function (Blueprint $table) {
            Schema::create('email_campaigns', function (Blueprint $table) {
                $table->id('email_campaign_id');
                $table->unsignedBigInteger('event_id');
                $table->string('title');
                $table->text('content');
                $table->string('sender_email');
                $table->string('sender_name')->nullable();
                $table->dateTime('scheduled_at')->nullable();
                $table->enum('status', ['draft', 'scheduled', 'sent', 'failed'])->default('draft');
                $table->timestamps();

                $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_campaigns');
    }
};
