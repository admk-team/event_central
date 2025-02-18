<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::table('event_apps', function (Blueprint $table) {
            $table->dropForeign(['regis_page_id']);

            $table->unsignedBigInteger('regis_page_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('event_apps', function (Blueprint $table) {
            $table->unsignedBigInteger('regis_page_id')->nullable(false)->change();

            $table->foreign('regis_page_id')->references('id')->on('registration_pages')->cascadeOnDelete();
        });
    }
};
