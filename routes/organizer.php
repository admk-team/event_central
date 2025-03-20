<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\Engagement\NewsfeedController;
use App\Http\Controllers\Organizer\Event\EventController;
use App\Http\Controllers\Organizer\Event\EventPartnerCategoryController;
use App\Http\Controllers\Organizer\Event\EventPartnerController;
use App\Http\Controllers\Organizer\Event\EventPlatformController;
use App\Http\Controllers\Organizer\Event\EventSessionController;
use App\Http\Controllers\Organizer\Event\EventSpeakerController;
use App\Http\Controllers\Organizer\Event\FooterController;
use App\Http\Controllers\Organizer\Event\HeaderController;
use App\Http\Controllers\Organizer\Event\ImportController;
use App\Http\Controllers\Organizer\Event\PageController;
use App\Http\Controllers\Organizer\Event\Settings\EventAppPaymentController;
use App\Http\Controllers\Organizer\Event\Settings\EventSettingsController;
use App\Http\Controllers\Organizer\Event\User\AttendeeController;
use App\Http\Controllers\Organizer\Event\PartnerController;
use App\Http\Controllers\Organizer\Event\EventAppTicketController;
use App\Http\Controllers\Organizer\Event\EventDateController;
use App\Http\Controllers\Organizer\Event\EventPromoCodeController;
use App\Http\Controllers\Organizer\Event\ScheduleController;
use App\Http\Controllers\Organizer\Event\Settings\WebsiteSettingsController;
use App\Http\Controllers\Organizer\Event\WebsiteController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use App\Http\Controllers\Organizer\RoleController;
use App\Http\Controllers\Organizer\UserController;
use App\Http\Controllers\QuestionController;
use App\Http\Middleware\CurrentEventMiddleware;
use Illuminate\Support\Facades\Route;

// Event Website
Route::prefix('e/{uuid}')->name('organizer.events.website')->group(function () {
    Route::get('/', [WebsiteController::class, 'index']);
    Route::get('{slug}', [WebsiteController::class, 'page'])->name('.page');
});

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Users
    Route::resource('users', UserController::class);
    Route::delete('users/delete/many', [UserController::class, 'destroyMany'])->name('users.destroy.many');

    // Roles
    Route::resource('roles', RoleController::class);

    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::put('/{event_app}', [EventController::class, 'update'])->name('update');
        Route::delete('/{event_app}', [EventController::class, 'destroy'])->name('destroy');
        Route::delete('/delete/many', [EventController::class, 'destroyMany'])->name('destroy.many');
        Route::get('{id}/select', [EventController::class, 'selectEvent'])->name('select');

        Route::middleware('event_is_selected')->group(function () {
            Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

            // Schedule (Event Sessions)
            Route::resource('schedule', EventSessionController::class);
            Route::delete('schedule/delete/many', [EventSessionController::class, 'destroyMany'])->name('schedule.destroy.many');

            // Speakers
            Route::resource('speaker', EventSpeakerController::class);
            Route::delete('speakers/delete/many', [EventSpeakerController::class, 'destroyMany'])->name('speakers.destroy.many');

            // Attendies
            Route::resource('attendees', AttendeeController::class);
            Route::delete('attendees/delete/many', [AttendeeController::class, 'destroyMany'])->name('attendees.destroy.many');

            // Wordshop
            Route::resource('workshop', WorkshopController::class);
            Route::resource('custom-menu', CustomMenuController::class);

            // Partner
            Route::resource('partner', EventPartnerController::class);
            Route::delete('partner/delete/many', [EventPartnerController::class, 'destroyMany'])->name('partner.destroy.many');
            Route::resource('partner-category', EventPartnerCategoryController::class);

            // Event Platforms
            Route::resource('event-platforms', EventPlatformController::class);

            // Event Date
            Route::resource('event-dates', EventDateController::class)->only(['store', 'update', 'destroy']);

            // Tickets
            Route::resource('tickets', EventAppTicketController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('tickets/delete/many', [EventAppTicketController::class, 'destroyMany'])->name('tickets.destroy.many');

            // Promo Codes
            Route::resource('promo-codes', EventPromoCodeController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('promo-codes/delete/many', [EventPromoCodeController::class, 'destroyMany'])->name('promo-codes.destroy.many');

            // Pages
            Route::resource('pages', PageController::class)->only(['store', 'update', 'destroy']);
            Route::delete('pages/delete/many', [PageController::class, 'destroyMany'])->name('pages.destroy.many');
            Route::post('pages/{page}/toggle-publish', [PageController::class, 'togglePublish'])->name('pages.toggle-publish');
            Route::post('pages/{page}/toggle-home-page', [PageController::class, 'toggleHomePage'])->name('pages.toggle-home-page');
            Route::get('pages/{page}/builder', [PageController::class, 'builder'])->name('pages.builder');
            Route::post('pages/{page}/builder', [PageController::class, 'builderSave'])->name('pages.builder.save');

            // Headers
            Route::resource('headers', HeaderController::class)->only(['store', 'update', 'destroy']);
            Route::delete('headers/delete/many', [HeaderController::class, 'destroyMany'])->name('headers.destroy.many');
            Route::post('headers/{header}/toggle-default', [HeaderController::class, 'toggleDefault'])->name('headers.toggle-default');
            Route::get('headers/{header}/builder', [HeaderController::class, 'builder'])->name('headers.builder');
            Route::post('headers/{header}/builder', [HeaderController::class, 'builderSave'])->name('headers.builder.save');

            // Footers
            Route::resource('footers', FooterController::class)->only(['store', 'update', 'destroy']);
            Route::delete('footers/delete/many', [FooterController::class, 'destroyMany'])->name('footers.destroy.many');
            Route::post('footers/{footer}/toggle-default', [FooterController::class, 'toggleDefault'])->name('footers.toggle-default');
            Route::get('footers/{footer}/builder', [FooterController::class, 'builder'])->name('footers.builder');
            Route::post('footers/{footer}/builder', [FooterController::class, 'builderSave'])->name('footers.builder.save');

            // Settings
            Route::prefix('settings')->name('settings.')->group(function () {
                // Event
                Route::prefix('event')->name('event.')->group(function () {
                    Route::get('/', [EventSettingsController::class, 'index'])->name('index');
                    Route::delete('/', [EventSettingsController::class, 'destroyEvent'])->name('destroy');
                    Route::put('info', [EventSettingsController::class, 'updateInfo'])->name('info');
                });
                // Payment
                Route::prefix('payment')->name('payment.')->group(function () {
                    Route::get('/', [EventAppPaymentController::class, 'index'])->name('index');
                    Route::put('update', [EventAppPaymentController::class, 'update'])->name('update');
                });
                // Website
                Route::prefix('website')->name('website.')->group(function () {
                    Route::get('/', [WebsiteSettingsController::class, 'index'])->name('index');
                    Route::post('/toggle-status', [WebsiteSettingsController::class, 'toggleStatus'])->name('toggle-status');
                });
            });

            // engagement
            Route::prefix('engagement')->name('engagement.')->group(function () {
                // Event
                Route::prefix('newsfeed')->name('newsfeed.')->group(function () {
                    Route::get('/', [NewsfeedController::class, 'index'])->name('index');
                    Route::post('/', [NewsfeedController::class, 'store'])->name('store');
                    Route::Put('/{post}/update', [NewsfeedController::class, 'update'])->name('update');
                    Route::delete('/{post}', [NewsfeedController::class, 'destroy'])->name('destroy');
                    Route::delete('/delete/many', [NewsfeedController::class, 'destroyMany'])->name('destroy.many');
                });
            });

            Route::post('import/{importType}', [ImportController::class, 'import'])->name('import');
        });
    });
   // Q&A
    Route::get('/events/qa', [QuestionController::class, 'index'])->name('events.qa.index');
    Route::post('/events/{event}/questions', [QuestionController::class, 'storeQuestion'])->name('events.qa.store');
    Route::post('/events/questions/{questionId}/vote', [QuestionController::class, 'vote'])->name('events.qa.vote');
    Route::post('/events/questions/{questionId}/answer', [QuestionController::class, 'storeAnswer'])->name('events.qa.answer');
    Route::group(['prefix' => 'events/qa', 'as' => 'events.qa.'], function () {
        Route::put('/question/{questionId}', [QuestionController::class, 'updateQuestion'])->name('updateQuestion');
        Route::delete('/question/{questionId}', [QuestionController::class, 'destroyQuestion'])->name('destroyQuestion');
        Route::put('/answer/{answerId}', [QuestionController::class, 'updateAnswer'])->name('updateAnswer');
        Route::delete('/answer/{answerId}', [QuestionController::class, 'destroyAnswer'])->name('destroyAnswer');
    });
});
