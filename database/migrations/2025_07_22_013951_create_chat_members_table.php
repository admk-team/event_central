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
        Schema::create('chat_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('user_id'); // App\Models\User or App\Models\Attendee
            $table->string('user_type');
            $table->unsignedBigInteger('participant_id'); // App\Models\User or App\Models\Attendee
            $table->string('participant_type');
            $table->unsignedInteger('unread_count')->default(0);
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('event_apps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_members');
    }
};
