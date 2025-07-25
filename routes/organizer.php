<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Organizer\Event\RefundPaymentController;
use App\Http\Controllers\Organizer\Event\AddonController;
use App\Http\Controllers\Organizer\Event\AssignTicketController;
use App\Http\Controllers\Organizer\Event\BadgePrintController;
use App\Http\Controllers\Organizer\Event\ContactFormController;
use App\Http\Controllers\Organizer\Event\CustomMenuController;
use App\Http\Controllers\Organizer\Event\DashboardController;
use App\Http\Controllers\Organizer\Event\EmailCampaignController;
use App\Http\Controllers\Organizer\Event\EmailTemplateController;
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
use App\Http\Controllers\Organizer\Event\EventTicketTypeController;
use App\Http\Controllers\Organizer\Event\FormFieldController;
use App\Http\Controllers\Organizer\Event\QuestionnaireFormFieldController;
use App\Http\Controllers\Organizer\Event\SessionAttendanceController;
use App\Http\Controllers\Organizer\Event\SessionRatingsController;
use App\Http\Controllers\Organizer\Event\Settings\QuestionnaireFormSettingsController;
use App\Http\Controllers\Organizer\Event\Settings\RegistrationFormSettingsController;
use App\Http\Controllers\Organizer\Event\Settings\WebsiteSettingsController;
use App\Http\Controllers\Organizer\Event\TrackController;
use App\Http\Controllers\Organizer\Event\UpgradeTicketController;
use App\Http\Controllers\Organizer\Event\WebsiteController;
use App\Http\Controllers\Organizer\Event\WorkshopController;
use App\Http\Controllers\Organizer\ProfileController;
use App\Http\Controllers\Organizer\RoleController;
use App\Http\Controllers\Organizer\Settings\OrganizerPaymentSettingController;
use App\Http\Controllers\Organizer\UserController;
use App\Http\Controllers\QuestionController;
use App\Http\Middleware\CheckAttendeeRegistrationForm;
use Illuminate\Support\Facades\Route;

// Event Website
Route::prefix('e/{uuid}')->name('organizer.events.website')->group(function () {
    Route::get('/', [WebsiteController::class, 'index']);
    Route::get('schedule', [WebsiteController::class, 'schedule'])->name('.schedule');
    Route::get('speakers', [WebsiteController::class, 'speakers'])->name('.speakers');
    Route::get('sponsors', [WebsiteController::class, 'sponsors'])->name('.sponsors');
    Route::get('exhibitors', [WebsiteController::class, 'exhibitors'])->name('.exhibitors');
    Route::get('tickets', [WebsiteController::class, 'tickets'])->name('.tickets');
    Route::get('privacy-policy', [WebsiteController::class, 'privacypolicy'])->name('.privacy');
    Route::get('contact-us', [WebsiteController::class, 'contactus'])->name('.contactus');
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
            Route::post('/attendee/event-checkin/{attendee}', [AttendeeController::class, 'eventChechIn'])->name('attendee.event-checkin');
            Route::post('/attendee/checkin', [AttendeeController::class, 'chechIn'])->name('attendee.checkin');
            Route::get('get-attendee-puchased-addons/{attendeePurchasedTicket}', [AttendeeController::class, 'getPurchasedTicketAddons'])->name('attendee.puchased-ticket.adddons');
            Route::post('attendee/import/event', [AttendeeController::class, 'importFromEvent'])->name('attendee.importevent');


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
            Route::resource('tickets-type', EventTicketTypeController::class);

            // Ticket-Features
            Route::resource('addon', AddonController::class)->only(['index', 'store', 'update', 'destroy']);
            // Route::get('addon/{event_app_ticket_id?}', [AddonController::class, 'getAllAddons'])->name('fetch');
            Route::delete('addon/delete/many', [AddonController::class, 'destroyMany'])->name('addon.destroy.many');
            Route::get('payments', [EventTicketsController::class, 'index'])->name('payments');
            Route::delete('payments/tickets/{attendeepayment}', [EventTicketsController::class, 'deleteTickets'])->name('delete.payment');

            //refund payments
            Route::get('refund/tickets', [RefundPaymentController::class, 'refundTickets'])->name('refund.tickets');
            Route::post('attendee/refundticket', [RefundPaymentController::class, 'attendeeRefund'])->name('attendee.refund');

            //Upgrade payments
            Route::get('upgrade/tickets', [UpgradeTicketController::class, 'upgradeTickets'])->name('tickets.upgrade');
            Route::post('upgrade/tickets', [UpgradeTicketController::class, 'saveTicketUpgrade'])->name('save.ticket.upgrade');
            Route::post('save/upgraded-sessions/{attendee}', [UpgradeTicketController::class, 'saveUpgradedSessions'])->name('save.upgraded.sessions');
            Route::post('save/free-upgraded-sessions/{attendee}', [UpgradeTicketController::class, 'saveUpgradedSessionsFree'])->name('save.upgraded.sessions.free');
            Route::post('proceed-for-checkout/{attendee}', [UpgradeTicketController::class, 'getStripPaymentIntent'])->name('upgrade.ticket.proceed.checkout');
            Route::get('upgrade-payment-success/{paymentUuid}', [UpgradeTicketController::class, 'showTicketUpgradeSuccess'])->name('upgrade.payment.success');

            // Promo Codes
            Route::resource('promo-codes', EventPromoCodeController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('promo-codes/delete/many', [EventPromoCodeController::class, 'destroyMany'])->name('promo-codes.destroy.many');

            // Ticket Fees
            Route::resource('ticket-fees', EventAppFeeController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::delete('ticket-fees/delete/many', [EventAppFeeController::class, 'destroyMany'])->name('ticket-fees.destroy.many');

            //ticket notifications
            Route::get('purchased-ticket/notification', [EventAppTicketController::class, 'purchaseNotification'])->name('purchased-ticket.notification');
            Route::post('notification/list', [EventAppTicketController::class, 'saveNotificationList'])->name('ticket.notification.list');

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
                    Route::post('toggle-checkin', [EventSettingsController::class, 'toggleCheckIn'])->name('toggle-checkin');
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
                // Questionnaire Form
                Route::resource('questionnaire-form-fields', QuestionnaireFormFieldController::class)->only(['store', 'update', 'destroy']);
                Route::prefix('questionnaire-form')->name('questionnaire-form.')->group(function () {
                    Route::get('/', [QuestionnaireFormSettingsController::class, 'index'])->name('index');
                    Route::post('/toggle-status', [QuestionnaireFormSettingsController::class, 'toggleStatus'])->name('toggle-status');
                    Route::post('/website', [QuestionnaireFormSettingsController::class, 'toggleStatus'])->name('toggle-status');
                    Route::get('/response', [QuestionnaireFormSettingsController::class, 'response'])->name('response');
                    Route::delete('/many', [QuestionnaireFormSettingsController::class, 'destroyMany'])->name('many');
                    Route::delete('/{destroy}', [QuestionnaireFormSettingsController::class, 'destroy'])->name('destroy'); // ✅ Added
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
            Route::get('assign-tickets/{attendee_id?}', [AssignTicketController::class, 'assignTickets'])->name('attendee.tickets.assign');
            Route::post('checkout/{attendee}/{paymnet_method}', [AssignTicketController::class, 'checkout'])->name('tickets.checkout');
            Route::post('checkout-free/{attendee}/{paymnet_method}', [AssignTicketController::class, 'checkoutFreeTicket'])->name('tickets.checkout.free');
            Route::get('checkout/{paymentUuId}', [AssignTicketController::class, 'showCheckoutPage'])->name('tickets.checkout.page');
            Route::get('/payment-success/{paymentUuId}', [AssignTicketController::class, 'paymentSuccess'])->name('payment.success');
            Route::post('update-attendee-payment/{paymentUuId}', [AssignTicketController::class, 'updateAttendeePaymnet'])->name('update.payment');
            Route::post('validate-discount-code/{disCode}', [AssignTicketController::class, 'validateDiscCode'])->name('validateCode.post');

            // Base Template
            Route::get('base-template', [EmailTemplateController::class, 'baseTemplate'])->name('base.template');
            Route::get('base-template/{baseTemplate}', [EmailTemplateController::class, 'viewBaseTemplate'])->name('base.template.view');
            Route::post('use-template/{baseTemplate}', [EmailTemplateController::class, 'setEmailTemplate'])->name('use.template');

            //Email Template
            Route::resource('email-template', EmailTemplateController::class);

            //Email Campaign
            Route::resource('email-campaign', EmailCampaignController::class);

            // contact forms
            Route::prefix('contact-forms')->name('contact-forms.')->group(function () {
                Route::resource('/', ContactFormController::class);
                Route::delete('/delete/many', [ContactFormController::class, 'destroyMany'])->name('destroy.many');
            });
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

    //Session ratings
    Route::get('/ratings/{eventSession}', [SessionRatingsController::class, 'index'])->name('sessions.ratings.index');
});
