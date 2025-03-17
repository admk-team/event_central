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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_app_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->default(null)->constrained()->onDelete('set null');
            $table->string('title');
            $table->string('slug');
            $table->longText('content');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->boolean('default_header')->default(false);
            $table->foreignId('header_id')->nullable()->default(null)->constrained()->onDelete('set null');
            $table->boolean('default_footer')->default(false);
            $table->foreignId('footer_id')->nullable()->default(null)->constrained()->onDelete('set null');
            $table->boolean('is_home_page')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            $table->unique(['event_app_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
