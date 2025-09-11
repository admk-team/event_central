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
       Schema::create('event_booths', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('event_app_id')->nullable();
    $table->foreign('event_app_id')->references('id')->on('event_apps')->onDelete('cascade');
    $table->string('name')->nullable();
    $table->text('description')->nullable();
    $table->unsignedBigInteger('number')->nullable();

    $table->string('status')->default('available');
    $table->string('logo')->nullable();
    $table->string('type', 20)->default('booth');   // booth | sponsor | banner
    $table->unsignedInteger('price')->nullable();   // points

    // NEW stock fields
    $table->unsignedInteger('total_qty')->default(1);
    $table->unsignedInteger('sold_qty')->default(0);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_booths');
    }
};
