<?php

use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\EventController;
use App\Http\Controllers\Organizer\Event\EventPartnerCategoryController;
use App\Http\Controllers\Organizer\Event\EventPartnerController;
use App\Http\Controllers\Organizer\Event\EventPlatformController;
use App\Http\Controllers\Organizer\Event\EventSessionController;
use App\Http\Controllers\Organizer\Event\EventSpeakerController;
use App\Http\Controllers\Organizer\Event\ImportController;
use App\Http\Controllers\Organizer\Event\Settings\EventAppPaymentController;
use App\Http\Controllers\Organizer\Event\Settings\EventSettingsController;
use App\Http\Controllers\Organizer\Event\User\AttendeeController;
use App\Http\Controllers\Organizer\Event\PartnerController;
use App\Http\Controllers\Organizer\Event\PassesController;
use App\Http\Controllers\Organizer\Event\ScheduleController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use App\Http\Middleware\CurrentEventMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::get('{id}/select', [EventController::class, 'selectEvent'])->name('select');

        Route::middleware('event_is_selected')->group(function () {
            Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
            Route::resource('schedule', EventSessionController::class);
            Route::delete('schedule/delete/many', [EventSessionController::class, 'destroyMany'])->name('schedule.destroy.many');
            Route::resource('speaker', EventSpeakerController::class);
            Route::delete('speakers/delete/many', [EventSpeakerController::class, 'destroyMany'])->name('speakers.destroy.many');
            Route::resource('attendees', AttendeeController::class);
            Route::delete('attendees/delete/many', [AttendeeController::class, 'destroyMany'])->name('attendees.destroy.many');
            Route::resource('workshop', WorkshopController::class);
            Route::resource('custom-menu', CustomMenuController::class);
            Route::resource('partner', EventPartnerController::class);
            Route::delete('partner/delete/many', [EventPartnerController::class, 'destroyMany'])->name('partner.destroy.many');
            Route::resource('partner-category', EventPartnerCategoryController::class);
            Route::resource('event-platforms',EventPlatformController::class);
            Route::resource('passes', PassesController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('passes/delete/many', [PassesController::class, 'destroyMany'])->name('passes.destroy.many');

            // Settings
            Route::prefix('settings')->name('settings.')->group(function () {
                // Event
                Route::prefix('event')->name('event.')->group(function () {
                    Route::get('/', [EventSettingsController::class, 'index'])->name('index');
                    Route::delete('/', [EventSettingsController::class, 'destroyEvent'])->name('destroy');
                    Route::put('info', [EventSettingsController::class, 'updateInfo'])->name('info');
                });
                Route::prefix('payment')->name('payment.')->group(function () {
                    Route::get('/', [EventAppPaymentController::class, 'index'])->name('index');
                    Route::put('update', [EventAppPaymentController::class, 'update'])->name('update');
                });
            });

            Route::post('import/{importType}', [ImportController::class, 'import'])->name('import');
        });
        
        Route::get('{id}', [EventController::class, 'selectEvent'])->name('select');
    });
});
