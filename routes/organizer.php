<?php

use App\Http\Controllers\Organizer\CustomMenuController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Organizer\DashboardController;
use App\Http\Controllers\Organizer\EventController;
use App\Http\Controllers\Organizer\EventSpeakerController;
use App\Http\Controllers\Organizer\PartnerController;
use App\Http\Controllers\Organizer\Schedule;
use App\Http\Controllers\Organizer\ScheduleController;
use App\Http\Controllers\Organizer\SpeakerController;
use App\Http\Controllers\Organizer\WorkshopController;

Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('preview', [EventController::class, 'index'])->name('preview');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('schedule', ScheduleController::class);
    Route::resource('speaker', EventSpeakerController::class);
    Route::resource('workshop', WorkshopController::class);
    Route::resource('custom-menu', CustomMenuController::class);
    Route::resource('partner', PartnerController::class);
});
