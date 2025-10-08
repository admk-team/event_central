+<?php

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
        Schema::table('session_check_ins', function (Blueprint $table) {
            // Your current FK name (from the error) is:
            // session_check_ins_session_id_foreign
            $table->dropForeign('session_check_ins_session_id_foreign');

            // Recreate it with ON DELETE CASCADE
            $table->foreign('session_id')
                  ->references('id')->on('event_sessions')
                  ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('session_check_ins', function (Blueprint $table) {
            // Revert to non-cascading FK (original behavior)
            $table->dropForeign(['session_check_ins_session_id_foreign']);

            $table->foreign('session_id')
                  ->references('id')->on('event_sessions');
        });
    }
};
