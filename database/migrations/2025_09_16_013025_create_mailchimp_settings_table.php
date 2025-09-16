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
        Schema::create('mailchimp_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organizer_id'); // link to organizer/user
            $table->string('api_key');
            $table->string('server_prefix'); // like us3, us21
            $table->string('audience_id');   // Mailchimp list ID
            $table->timestamps();

            // optional foreign key if you have organizers table
            $table->foreign('organizer_id')->references('id')->on('users') ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mailchimp_settings');
    }
};
