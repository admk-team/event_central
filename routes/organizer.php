<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Organizer\DashboardController;
use App\Http\Controllers\Organizer\EventController;

Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    
    Route::get('preview', [EventController::class, 'index'])->name('preview');
});
