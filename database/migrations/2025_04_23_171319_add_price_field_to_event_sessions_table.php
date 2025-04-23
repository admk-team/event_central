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
        Schema::table('event_sessions', function (Blueprint $table) {
            $table->decimal('price', 8, 2)->nullable()->after('posts');
            // Adding the price field to the event_sessions table
            // The price field is a decimal with a total of 8 digits and 2 decimal places
            // The field is nullable, meaning it can be left empty
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_sessions', function (Blueprint $table) {
            $table->dropColumn('price');
            // Dropping the price field from the event_sessions table
        });
    }
};
