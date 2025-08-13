<?php

use App\Http\Controllers\Attendee\AppEventQuestionnaireFormController;
use App\Http\Controllers\Attendee\AppEventRegistrationFormController;
use App\Http\Controllers\Attendee\AttendeeUpgradeTicketController;
use App\Http\Controllers\Attendee\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Attendee\Auth\EmailChangeController;
use App\Http\Controllers\Attendee\Auth\PasswordController;
use App\Http\Controllers\Attendee\Auth\RegisteredUserController;
use App\Http\Controllers\Attendee\BadgeAchievementController;
use App\Http\Controllers\Attendee\ChatController;
use App\Http\Controllers\Attendee\EventCalendarController;
use App\Http\Controllers\Attendee\EventController;
use App\Http\Controllers\Attendee\EventSessionController;
use App\Http\Controllers\Attendee\Payment\PaymentController;
use App\Http\Controllers\Attendee\EventPostController;
use App\Http\Controllers\Attendee\EventQuestionnaireFormController;
use App\Http\Controllers\Attendee\EventRegistrationFormController;
use App\Http\Controllers\Attendee\EventShopController;
use App\Http\Controllers\Attendee\EventStaffController;
use App\Http\Controllers\Attendee\FriendRequestController;
use App\Http\Controllers\Attendee\GoogleController;
use App\Http\Controllers\Attendee\LiveStreamController;
use App\Http\Controllers\Attendee\Payment\RefundPaymentController;
use App\Http\Controllers\Attendee\PrayerRequestController;
use App\Http\Controllers\Attendee\ProfileController;
use App\Http\Controllers\Attendee\QrCodeController;
use App\Http\Controllers\Attendee\QuestionAttendeeController as AttendeeQuestionAttendeeController;
use App\Http\Controllers\Attendee\WaitingListController;
use App\Http\Controllers\QuestionAttendeeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->prefix('attendee')->group(function () {
    // Route::get('{id}', [EventController::class, 'getEventDetail'])->name('attendee.event');

    Route::get('{eventApp}/login', [AuthenticatedSessionController::class, 'create'])->name('attendee.login');
    Route::post('{eventApp}/login', [AuthenticatedSessionController::class, 'store'])->name('attendee.login.store');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('attendee.logout');

    Route::middleware('check_event_registration_method')->group(
        function () {
            Route::get('{eventApp}/register', [RegisteredUserController::class, 'create'])->name('attendee.register');
            Route::post('{eventApp}/register', [RegisteredUserController::class, 'store'])->name('attendee.register.store');
        }
    );
});

// Event Registration Form for Web
Route::prefix('{eventApp}/event-registration-form')->name('attendee.event-registration-form')->group(function () {
    Route::get('/', [EventRegistrationFormController::class, 'index']);
    Route::post('/', [EventRegistrationFormController::class, 'submit'])->name('.submit');
});

// Event Registration Form for App
Route::prefix('app-event-registration-form/{eventApp}')->name('attendee.app-event-registration-form')->group(function () {
    Route::get('/', [AppEventRegistrationFormController::class, 'index']);
    Route::post('/', [AppEventRegistrationFormController::class, 'submit'])->name('.submit');
});

// http://127.0.0.1:8000/google-login/callback
Route::get('{eventApp}/google-login/redirect', [AuthenticatedSessionController::class, 'googleRedirect'])->name('attendee.google.redirect');
Route::get('google-login/callback', [AuthenticatedSessionController::class, 'googleCallback'])->name('attendee.google.callback');

// Route::middleware(['auth'])->group(function () {
Route::get('get-attendee-purchased-tickets/{attendee}', [AttendeeUpgradeTicketController::class, 'getAttendeePurchasedTickets'])
    ->name('get.attendee.purchased.tickets');
Route::get('get-attendee-sessions/{purchasedTicketId}', [AttendeeUpgradeTicketController::class, 'getAttendeePurchasedTicketSessions'])
    ->name('get.attendee.purchased.ticket.sessions');
// });


Route::middleware(['auth:attendee', 'check_attendee_registration_form'])->group(function () {

    Route::prefix('attendee')->group(function () {
        Route::get('profile-edit', [ProfileController::class, 'edit'])->name('attendee.profile.edit');

        Route::get('dashboard', [EventController::class, 'getEventDetailDashboard'])->name('attendee.event.detail.dashboard');
        Route::get('calendar/download/{eventApp}', [EventCalendarController::class, 'downloadIcs'])->name('calendar.download');
        Route::get('agenda', [EventController::class, 'getEventDetailAgenda'])->name('attendee.event.detail.agenda');
        Route::get('session/{eventSession}', [EventController::class, 'getEventSessionDetail'])->name('attendee.event.detail.session');
        Route::get('speakers/{eventSpeaker?}', [EventController::class, 'getEventSpeakerDetail'])->name('attendee.event.detail.speakers');
        Route::get('more', [EventController::class, 'getEventDetailMore'])->name('attendee.event.detail.more');
        Route::post('contact-form', [EventController::class, 'submitContectForm'])->name('attendee.event.detail.contact');

        //Event Shop
        Route::get('products',[EventShopController::class,'index'])->name('attendee.event.products');
        Route::post('puchase/product', [EventShopController::class, 'checkout'])->name('attendee.product.purchase');
        Route::post('product/update/{paymentId}', [EventShopController::class, 'updateOrder'])->name('attendee.product.update');
        Route::get('product/checkout/{data}', [EventShopController::class, 'checkoutPage'])->name('attendee.product.checkout');
        Route::get('success/checkout', [EventShopController::class, 'paymentSuccess'])->name('attendee.product.checkout.success');
        Route::get('cancel/checkout', [EventShopController::class, 'paymentCancel'])->name('attendee.product.checkout.cancel');

        //QR Routes
        Route::get('/qr-code/{eventApp}', [QrCodeController::class, 'getQrCode'])->name('attendee.qr-code.get');
        Route::post('/qr-code/{eventApp}', [QrCodeController::class, 'postQrCode'])->name('attendee.qr-code.post');

        //Payment Processing
        Route::get('view-tickets', [PaymentController::class, 'viewTickets'])->name('attendee.tickets.get');
        Route::get('purchased-tickets', [PaymentController::class, 'attendeepurchasedTickets'])->name('attendee.tickets.purchased');
        Route::post('submit-ticket-emails', [PaymentController::class, 'submitTicketTransfer'])->name('attendee.tickets.transfer');

        // waitList Attendee
        Route::post('waitlist-ticket', [WaitingListController::class, 'store'])->name('attendee.waitlist.post');
        Route::delete('waitlist-ticket', [WaitingListController::class, 'destroy'])->name('attendee.delete.waitlist');

        //Refund of Tickets
        Route::get('refund-tickets', [RefundPaymentController::class, 'refundAttendeeTicket'])->name('attendee.tickets.refund');
        Route::post('refund-request', [RefundPaymentController::class, 'refundAttendeeRequest'])->name('attendee.tickets.refund.save');

        //checkout processing
        Route::get('checkout/{paymentUuId}', [PaymentController::class, 'showCheckoutPage'])->name('attendee.tickets.checkout.page');
        Route::post('checkout', [PaymentController::class, 'checkout'])->name('attendee.tickets.checkout');
        Route::post('checkout-free-ticket', [PaymentController::class, 'checkoutFreeTicket'])->name('attendee.tickets.checkout.free');

        Route::post('update-attendee-payment/{paymentUuId}', [PaymentController::class, 'updateAttendeePaymnet'])->name('attendee.update.payment');

        Route::get('{eventApp}/payment-success', [PaymentController::class, 'paymentSuccess'])->name('attendee.payment.success');
        Route::get('/event-posts/{id}', [EventController::class, 'getPostsMore'])->name('attendee.posts.index');

        //Upgrade payments
        Route::get('upgrade/tickets', [AttendeeUpgradeTicketController::class, 'upgradeTickets'])->name('attendee.tickets.upgrade');
        Route::post('upgrade/tickets', [AttendeeUpgradeTicketController::class, 'saveTicketUpgrade'])->name('attendee.save.ticket.upgrade');
        Route::post('save/upgraded-sessions/{attendee}', [AttendeeUpgradeTicketController::class, 'saveUpgradedSessions'])->name('attendee.save.upgraded.sessions');
        Route::post('save/free-upgraded-sessions/{attendee}', [AttendeeUpgradeTicketController::class, 'saveUpgradedSessionsFree'])->name('save.upgraded.sessions.free');
        Route::post('proceed-for-checkout/{attendee}', [AttendeeUpgradeTicketController::class, 'getStripPaymentIntent'])->name('attendee.upgrade.ticket.proceed.checkout');
        Route::get('upgrade-payment-success/{paymentUuid}', [AttendeeUpgradeTicketController::class, 'showTicketUpgradeSuccess'])->name('attendee.upgrade.payment.success');

        //PayPal
        Route::post('/paypal/create-order', [PaymentController::class, 'createPayPalOrder'])->name('attendee.paypal.create-order');
        Route::post('/paypal/capture-order', [PaymentController::class, 'capturePayPalOrder'])->name('attendee.paypal.capture-order');

        Route::get('/payment/cancel', [PaymentController::class, 'paymentCancel'])->name('attendee.payment.cancel');
        Route::post('validate-discount-code/{disCode}', [PaymentController::class, 'validateDiscCode'])->name('attendee.validateCode.post');
        Route::get('/payment-success/{paymentUuId}', [PaymentController::class, 'paymentSuccess'])->name('attendee.payment.success');

        // Event questionnaire Form For Web
        Route::prefix('event-questionnaire-form')->name('attendee.event-questionnaire-form')->group(function () {
            Route::get('/', [EventQuestionnaireFormController::class, 'index']);
            Route::post('/', [EventQuestionnaireFormController::class, 'submit'])->name('.submit');
        });

        //Attendee achievement
        Route::get('/achievement', [BadgeAchievementController::class, 'index'])->name('attendee.achievement');

        // Chat
        Route::get('chat', [ChatController::class, 'index'])->name('attendee.event.chat');
        Route::get('get-chat/{id}', [ChatController::class, 'getMessages'])->name('attendee.event.get-messages');
        Route::get('private-chat/{id}', [ChatController::class, 'getOneToOneChat']);
        Route::post('chat/mark-as-read/{id}', [ChatController::class, 'markAsRead']);
        Route::post('send-message', [ChatController::class, 'store']);
        // Event Staff
        Route::get('staff', [EventStaffController::class, 'index'])->name('attendee.event.staff');
        Route::post('initiate-chat', [EventStaffController::class, 'initiateChat'])->name('attendee.event.chat-initate');
        // Friends system
        Route::resource('friend', FriendRequestController::class);
        Route::post('accept', [FriendRequestController::class,'AcceptRequest'])->name('friend.accept');
        Route::post('unfollow', [FriendRequestController::class,'remove'])->name('friend.unfollow');

        //Prayer Request
        Route::get('/prayer-requests', [PrayerRequestController::class, 'index'])->name('attendee.prayer');
        Route::post('/prayer-requests', [PrayerRequestController::class, 'store'])->name('attendee.prayer.store');
        Route::put('/prayer-requests/{id}', [PrayerRequestController::class, 'update'])->name('attendee.prayer.update');
        Route::delete('/prayer-requests/{id}', [PrayerRequestController::class, 'destroy'])->name('attendee.prayer.destroy');
        Route::post('/prayer-request/view/{id}', [PrayerRequestController::class, 'view'])->name('attendee.prayer.view');

        Route::get('/eventcalendar', [EventCalendarController::class, 'index'])->name('event.calendar');
    });

    Route::put('/attendee-profile-update/{attendee}', [ProfileController::class, 'update'])->name('attendee.profile.update');
    Route::post('/attendee-change-password', [PasswordController::class, 'update'])->name('attendee.change.password');
    Route::post('/attendee-change-email', [EmailChangeController::class, 'update'])->name('attendee.change.email');

    Route::post('/attendee-save-session/{eventSession}/{type}', [EventSessionController::class, 'saveSession'])->name('attendee.save.session');

    Route::post('/attendee-save-rating/{eventSession}', [EventSessionController::class, 'saveRating'])->name('attendee.save.rating');
    Route::post('/attendee-check-in/{eventSession}', [EventSessionController::class, 'saveCheckIn'])->name('attendee.checkin');

    Route::post('/attendee-poll-rating', [EventPostController::class, 'pollToggle'])->name('attendee.poll.rating');
    Route::post('/attendee-post-likes', [EventPostController::class, 'toggleLike'])->name('attendee.like.rating');
    Route::post('/attendee-post-dislikes', [EventPostController::class, 'toggleDislike'])->name('attendee.dislike.rating');
    // Q&A
    Route::get('/events/qa/{session_id}', [AttendeeQuestionAttendeeController::class, 'index'])->name('attendee.events.qa.index');
    Route::post('/events/{event}/questions', [AttendeeQuestionAttendeeController::class, 'storeQuestion'])->name('attendee.events.qa.store');
    Route::post('/events/questions/{questionId}/vote', [AttendeeQuestionAttendeeController::class, 'vote'])->name('attendee.events.qa.vote');
    Route::post('/events/questions/{questionId}/answer', [AttendeeQuestionAttendeeController::class, 'storeAnswer'])->name('attendee.events.qa.answer');
    Route::group(['prefix' => 'events/qa', 'as' => 'attendee.events.qa.'], function () {
        Route::put('/question/{questionId}', [AttendeeQuestionAttendeeController::class, 'updateQuestion'])->name('updateQuestion');
        Route::delete('/question/{questionId}', [AttendeeQuestionAttendeeController::class, 'destroyQuestion'])->name('destroyQuestion');
        Route::put('/answer/{answerId}', [AttendeeQuestionAttendeeController::class, 'updateAnswer'])->name('updateAnswer');
        Route::delete('/answer/{answerId}', [AttendeeQuestionAttendeeController::class, 'destroyAnswer'])->name('destroyAnswer');
    });
    //fav session
    Route::get('/favsession/{sessionid}', [EventController::class, 'favsession'])->name('fav.sessions');
    Route::get('/allfav', [EventController::class, 'allfavouriteSession'])->name('all.fav.sessions');

    Route::get('/streams/index',[LiveStreamController::class,'index'])->name('stream.index');
    Route::get('/join/stream/{id}', [LiveStreamController::class, 'joinLiveStreams'])->name('join.live.streams');

});

// Event questionnaire Form For Web
Route::prefix('app-event-questionnaire-form/{eventApp}')->name('attendee.app-event-questionnaire-form')->group(function () {
    Route::get('/', [AppEventQuestionnaireFormController::class, 'index']);
    Route::post('/', [AppEventQuestionnaireFormController::class, 'submit'])->name('.submit');
});
