<?php

use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\EventController;
use App\Http\Controllers\Organizer\Event\EventSessionController;
use App\Http\Controllers\Organizer\Event\EventSpeakerController;
use App\Http\Controllers\Organizer\Event\PartnerController;
use App\Http\Controllers\Organizer\Event\PassesController;
use App\Http\Controllers\Organizer\Event\ScheduleController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');

        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::middleware(['event_is_selected'])->group(function () {  //To make sure that user has selected event and event_id is available in session
            Route::resource('schedule', EventSessionController::class);
            Route::delete('schedule/delete/many', [EventSessionController::class, 'destroyMany'])->name('schedule.destroy.many');
            Route::resource('speaker', EventSpeakerController::class);
            Route::delete('speakers/delete/many', [EventSpeakerController::class, 'destroyMany'])->name('speakers.destroy.many');
            Route::resource('workshop', WorkshopController::class);
            Route::resource('custom-menu', CustomMenuController::class);
            Route::resource('partner', PartnerController::class);
            Route::resource('passes', PassesController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('passes/delete/many', [PassesController::class, 'destroyMany'])->name('passes.destroy.many');
        });
        Route::get('{id}', [EventController::class, 'selectEvent'])->name('select');
    });
});
