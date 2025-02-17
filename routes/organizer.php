<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Organizer\DashboardController;

Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
