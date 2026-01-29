<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('attendee_payments', function (Blueprint $table) {
            $table->string('confirmation_number', 32)->nullable()->unique()->after('uuid');
        });

        // Backfill existing payments with a unique confirmation number
        $payments = DB::table('attendee_payments')->whereNull('confirmation_number')->get();
        foreach ($payments as $payment) {
            do {
                $confirmation = 'EC-' . strtoupper(Str::random(8));
            } while (DB::table('attendee_payments')->where('confirmation_number', $confirmation)->exists());

            DB::table('attendee_payments')
                ->where('id', $payment->id)
                ->update(['confirmation_number' => $confirmation]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendee_payments', function (Blueprint $table) {
            $table->dropColumn('confirmation_number');
        });
    }
};
