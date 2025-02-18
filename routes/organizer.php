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
use App\Http\Controllers\Organizer\ProfileController;

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('events', [EventController::class, 'index'])->name('event.preview');
    Route::get('event/{id}', [EventController::class, 'selectEvent'])->name('event.select');
    Route::post('event', [EventController::class, 'store'])->name('event.store');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('schedule', ScheduleController::class);
    Route::resource('speaker', EventSpeakerController::class);
    Route::resource('workshop', WorkshopController::class);
    Route::resource('custom-menu', CustomMenuController::class);
    Route::resource('partner', PartnerController::class);
});
