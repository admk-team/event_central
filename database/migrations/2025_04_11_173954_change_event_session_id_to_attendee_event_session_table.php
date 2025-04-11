<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('attendee_event_session', function (Blueprint $table) {
            // Drop existing foreign key constraint
            $table->dropForeign(['event_session_id']);
            
            // Recreate with cascade deletion
            $table->foreign('event_session_id')
                  ->references('id')
                  ->on('event_sessions')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('attendee_event_session', function (Blueprint $table) {
            // Remove cascade constraint
            $table->dropForeign(['event_session_id']);
            // Restore original foreign key without cascade
            $table->foreign('event_session_id')
                  ->references('id')
                  ->on('event_sessions');
        });
    }
};