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
        Schema::table('attendees', function (Blueprint $table) {
            // First add the column
            $table->unsignedBigInteger('parent_id')->nullable()->after('id');

            // Then define the foreign key constraint
            $table->foreign('parent_id')
                ->references('id')
                ->on('attendees')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('attendees', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn('parent_id');
        });
    }
};
