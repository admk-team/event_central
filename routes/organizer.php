<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Organizer\Event\AddonController;
use App\Http\Controllers\Organizer\Event\AssignTicketController;
use App\Http\Controllers\Organizer\Event\BadgePrintController;
use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\Engagement\NewsfeedController;
use App\Http\Controllers\Organizer\Event\EventAppFeeController;
use App\Http\Controllers\Organizer\Event\EventController;
use App\Http\Controllers\Organizer\Event\EventPartnerCategoryController;
use App\Http\Controllers\Organizer\Event\EventPartnerController;
use App\Http\Controllers\Organizer\Event\EventPlatformController;
use App\Http\Controllers\Organizer\Event\EventSessionController;
use App\Http\Controllers\Organizer\Event\EventSpeakerController;
use App\Http\Controllers\Organizer\Event\EventTicketsController;
use App\Http\Controllers\Organizer\Event\FooterController;
use App\Http\Controllers\Organizer\Event\HeaderController;
use App\Http\Controllers\Organizer\Event\ImportController;
use App\Http\Controllers\Organizer\Event\PageController;
use App\Http\Controllers\Organizer\Event\Settings\EventAppPaymentController;
use App\Http\Controllers\Organizer\Event\Settings\EventSettingsController;
use App\Http\Controllers\Organizer\Event\User\AttendeeController;
use App\Http\Controllers\Organizer\Event\EventAppTicketController;
use App\Http\Controllers\Organizer\Event\EventDateController;
use App\Http\Controllers\Organizer\Event\EventPromoCodeController;
use App\Http\Controllers\Organizer\Event\FormFieldController;
use App\Http\Controllers\Organizer\Event\SessionAttendanceController;
use App\Http\Controllers\Organizer\Event\Settings\RegistrationFormSettingsController;
use App\Http\Controllers\Organizer\Event\Settings\WebsiteSettingsController;
use App\Http\Controllers\Organizer\Event\TrackController;
use App\Http\Controllers\Organizer\Event\WebsiteController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use App\Http\Controllers\Organizer\RoleController;
use App\Http\Controllers\Organizer\Settings\OrganizerPaymentSettingController;
use App\Http\Controllers\Organizer\UserController;
use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;

// Event Website
Route::prefix('e/{uuid}')->name('organizer.events.website')->group(function () {
    Route::get('/', [WebsiteController::class, 'index']);
    Route::get('schedule', [WebsiteController::class, 'schedule'])->name('.schedule');
    Route::get('speakers', [WebsiteController::class, 'speakers'])->name('.speakers');
    Route::get('sponsors', [WebsiteController::class, 'sponsors'])->name('.sponsors');
    Route::get('{slug}', [WebsiteController::class, 'page'])->name('.page');
});

Route::middleware(['auth', 'panel:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Users
    Route::resource('users', UserController::class);
    Route::delete('users/delete/many', [UserController::class, 'destroyMany'])->name('users.destroy.many');

    // Roles
    Route::resource('roles', RoleController::class);

    // Payment Settings
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::prefix('payment')->name('payment.')->group(function () {
            Route::get('/', [OrganizerPaymentSettingController::class, 'index'])->name('index');
            Route::put('update', [OrganizerPaymentSettingController::class, 'update'])->name('update');
        });
    });


    //Events
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::put('/{event_app}', [EventController::class, 'update'])->name('update');
        Route::delete('/{event_app}', [EventController::class, 'destroy'])->name('destroy');
        Route::delete('/delete/many', [EventController::class, 'destroyMany'])->name('destroy.many');
        Route::get('{id}/select', [EventController::class, 'selectEvent'])->name('select');

        // Event Images
        Route::post('{event_app}/images ', [EventController::class, 'storeImage'])->name('images.store');
        Route::delete('{event_app}/images/{eventAppImage} ', [EventController::class, 'destroyImage'])->name('images.destroy');

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
            Route::get('attendee/info/{id}', [AttendeeController::class, 'showInfo'])->name('attendee.info');
            Route::get('attendee/qrcode/{attendee}', [AttendeeController::class, 'qrCodeAttendee'])->name('attendee.qrcode');
            Route::put('/attendee/profile/update/{id}', [AttendeeController::class, 'updateAttendee'])->name('attendee.profile.update');
            Route::post('/attendee/checkin', [AttendeeController::class, 'chechIn'])->name('attendee.checkin');

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

            // Ticket-Features
            Route::resource('addon', AddonController::class)->only(['index', 'store', 'update', 'destroy']);
            // Route::get('addon/{event_app_ticket_id?}', [AddonController::class, 'getAllAddons'])->name('fetch');
            Route::delete('addon/delete/many', [AddonController::class, 'destroyMany'])->name('addon.destroy.many');
            Route::get('event/tickets', [EventTicketsController::class, 'index'])->name('event.tickets');

            // Promo Codes
            Route::resource('promo-codes', EventPromoCodeController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('promo-codes/delete/many', [EventPromoCodeController::class, 'destroyMany'])->name('promo-codes.destroy.many');

            // Ticket Fees
            Route::resource('ticket-fees', EventAppFeeController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('ticket-fees/delete/many', [EventAppFeeController::class, 'destroyMany'])->name('ticket-fees.destroy.many');

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

            // Form Fields
            Route::resource('form-fields', FormFieldController::class)->only(['store', 'update', 'destroy']);

            // Tracks
            Route::resource('tracks', TrackController::class)->only('store', 'update', 'destroy');

            // Settings
            Route::prefix('settings')->name('settings.')->group(function () {
                // Event
                Route::prefix('event')->name('event.')->group(function () {
                    Route::get('/', [EventSettingsController::class, 'index'])->name('index');
                    Route::delete('/', [EventSettingsController::class, 'destroyEvent'])->name('destroy');
                    Route::put('info', [EventSettingsController::class, 'updateInfo'])->name('info');
                    Route::get('generate-link', [EventSettingsController::class, 'generateLink'])->name('link');
                    Route::post('toggle-tracks', [EventSettingsController::class, 'toggleTracks'])->name('toggle-tracks');
                });

                // Payment
                Route::prefix('payment')->name('payment.')->group(function () {
                    Route::get('/', [EventAppPaymentController::class, 'index'])->name('index');
                    Route::put('update', [EventAppPaymentController::class, 'update'])->name('update');
                });

                // Registration Form
                Route::prefix('registration-form')->name('registration-form.')->group(function () {
                    Route::get('/', [RegistrationFormSettingsController::class, 'index'])->name('index');
                    Route::post('/toggle-status', [RegistrationFormSettingsController::class, 'toggleStatus'])->name('toggle-status');
                    Route::post('/website', [RegistrationFormSettingsController::class, 'toggleStatus'])->name('toggle-status');
                });

                // Website
                Route::prefix('website')->name('website.')->group(function () {
                    Route::get('/', [WebsiteSettingsController::class, 'index'])->name('index');
                    Route::post('/toggle-status', [WebsiteSettingsController::class, 'toggleStatus'])->name('toggle-status');
                    Route::post('/save-colors', [WebsiteSettingsController::class, 'saveColors'])->name('save-colors');
                });
            });

            Route::post('import/{importType}', [ImportController::class, 'import'])->name('import');

            Route::get('badgeprint', [BadgePrintController::class, 'index'])->name('badge.print');

            // Assign Ticket by Organizer Routes
            Route::get('assign-tickets', [AssignTicketController::class, 'assignTickets'])->name('attendee.tickets.assign');
            Route::post('checkout/{attendee}/{paymnet_method}', [AssignTicketController::class, 'checkout'])->name('tickets.checkout');
            Route::post('checkout-free/{attendee}/{paymnet_method}', [AssignTicketController::class, 'checkoutFreeTicket'])->name('tickets.checkout.free');
            Route::get('checkout/{paymentUuId}', [AssignTicketController::class, 'showCheckoutPage'])->name('tickets.checkout.page');
            Route::get('/payment-success/{paymentUuId}', [AssignTicketController::class, 'paymentSuccess'])->name('payment.success');
            Route::post('update-attendee-payment/{paymentUuId}', [AssignTicketController::class, 'updateAttendeePaymnet'])->name('update.payment');
            Route::post('validate-discount-code/{disCode}', [AssignTicketController::class, 'validateDiscCode'])->name('validateCode.post');
        });

        // Q&A
        Route::get('/qa/{session_id}', [QuestionController::class, 'index'])->name('qa.index');
        Route::post('/{event}/questions', [QuestionController::class, 'storeQuestion'])->name('qa.store');
        Route::post('/questions/{questionId}/vote', [QuestionController::class, 'vote'])->name('qa.vote');
        Route::post('/questions/{questionId}/answer', [QuestionController::class, 'storeAnswer'])->name('qa.answer');
        Route::group(['prefix' => 'events/qa', 'as' => 'qa.'], function () {
            Route::put('/question/{questionId}', [QuestionController::class, 'updateQuestion'])->name('updateQuestion');
            Route::delete('/question/{questionId}', [QuestionController::class, 'destroyQuestion'])->name('destroyQuestion');
            Route::put('/answer/{answerId}', [QuestionController::class, 'updateAnswer'])->name('updateAnswer');
            Route::delete('/answer/{answerId}', [QuestionController::class, 'destroyAnswer'])->name('destroyAnswer');
        });

        //SessionAttendance
        Route::get('/attendance', [SessionAttendanceController::class, 'index'])->name('attendance.index');
        Route::delete('/attendance/{id}', [SessionAttendanceController::class, 'destroy'])->name('attendance.destroy');
        Route::delete('/attendance/destroy/many', [SessionAttendanceController::class, 'destroyMany'])->name('attendance.destroy.many');
        // Route::post('/attendance/destroy/many', [SessionAttendanceController::class, 'destroyMany'])->name('attendance.destroy.many');
    });
    // Event
    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/event/posts/{id}', [NewsfeedController::class, 'index'])->name('index');
        Route::post('/event/post', [NewsfeedController::class, 'store'])->name('store');
        Route::post('/event/{post}/update', [NewsfeedController::class, 'updatePost'])->name('update');
        Route::delete('/{post}', [NewsfeedController::class, 'destroy'])->name('destroy');
        Route::delete('/delete/many', [NewsfeedController::class, 'destroyMany'])->name('destroy.many');
    });

    // Q&A
    Route::get('/events/qa/{session_id}', [QuestionController::class, 'index'])->name('events.qa.index');
    Route::post('/events/{event}/questions', [QuestionController::class, 'storeQuestion'])->name('events.qa.store');
    Route::post('/events/questions/{questionId}/vote', [QuestionController::class, 'vote'])->name('events.qa.vote');
    Route::post('/events/questions/{questionId}/answer', [QuestionController::class, 'storeAnswer'])->name('events.qa.answer');
    Route::group(['prefix' => 'events/qa', 'as' => 'events.qa.'], function () {
        Route::put('/question/{questionId}', [QuestionController::class, 'updateQuestion'])->name('updateQuestion');
        Route::delete('/question/{questionId}', [QuestionController::class, 'destroyQuestion'])->name('destroyQuestion');
        Route::put('/answer/{answerId}', [QuestionController::class, 'updateAnswer'])->name('updateAnswer');
        Route::delete('/answer/{answerId}', [QuestionController::class, 'destroyAnswer'])->name('destroyAnswer');
    });

    //SessionAttendance
    Route::get('/events/attendance', [SessionAttendanceController::class, 'index'])->name('events.attendance.index');
    Route::delete('/events/attendance/{id}', [SessionAttendanceController::class, 'destroy'])->name('events.attendance.destroy');
    Route::delete('/events/attendance/destroy/many', [SessionAttendanceController::class, 'destroyMany'])->name('events.attendance.destroy.many');
    // Route::post('/events/attendance/destroy/many', [SessionAttendanceController::class, 'destroyMany'])->name('events.attendance.destroy.many');
});
