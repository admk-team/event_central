<?php

use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\EventController;
use App\Http\Controllers\Organizer\Event\EventSessionController;
use App\Http\Controllers\Organizer\Event\EventSpeakerController;
use App\Http\Controllers\Organizer\Event\PartnerController;
use App\Http\Controllers\Organizer\Event\ScheduleController;
use App\Http\Controllers\Organizer\Event\User\AttendeeController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');

        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('schedule', EventSessionController::class);
        Route::delete('schedule/delete/many', [EventSessionController::class, 'destroyMany'])->name('schedule.destroy.many');
        Route::resource('speaker', EventSpeakerController::class);
        Route::delete('speakers/delete/many',[EventSpeakerController::class,'destroyMany'])->name('speakers.destroy.many');
        Route::resource('attendees', AttendeeController::class);
        Route::delete('attendees/delete/many',[AttendeeController::class,'destroyMany'])->name('attendees.destroy.many');
        Route::resource('workshop', WorkshopController::class);
        Route::resource('custom-menu', CustomMenuController::class);
        Route::resource('partner', PartnerController::class);

        Route::get('{id}', [EventController::class, 'selectEvent'])->name('select');
    });
});