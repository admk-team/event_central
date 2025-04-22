<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\Attendee\EventPostController;
use App\Http\Controllers\Api\v1\Organizer\EventController;
use App\Http\Controllers\Api\v1\Attendee\PaymentController;
use App\Http\Controllers\Api\v1\Attendee\ProfileController;
use App\Http\Controllers\Api\v1\Attendee\RegisterController;
use App\Http\Controllers\Api\v1\Organizer\EventSessionController;
use App\Http\Controllers\Api\v1\Attendee\EventController as AttendeeEventController;
use App\Http\Controllers\Api\v1\Attendee\QuestionAttendeeController as AttendeeQuestionAttendeeController;
use App\Http\Controllers\Api\v1\Organizer\AssignTicketApiController;
use App\Http\Controllers\Api\v1\Organizer\QAController;
use App\Http\Controllers\Api\v1\Organizer\AttendeeController;
use App\Http\Controllers\Api\v1\Organizer\TicketController;
use App\Http\Controllers\Api\v1\Organizer\EventPostsController;
use App\Http\Controllers\Api\v1\Organizer\PasswordController;
use App\Http\Controllers\Api\v1\Organizer\PaymentController as OrganizerPaymentController;
use App\Http\Controllers\Api\v1\Organizer\ProfileController as OrganizerProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('user')->group(function () {

    Route::post('/login', [AuthController::class, 'login'])->defaults('type', 'user');

    Route::middleware(['auth:sanctum', 'ability:role:user'])->group(function () {
        Route::get('/me', function (Request $request) {
            return $request->user();
        });
        Route::post('profile/update', [OrganizerProfileController::class, 'update']);
        Route::post('password/update', [PasswordController::class, 'update']);

        // Events
        Route::get('events', [EventController::class, 'index']);
        Route::get('events/{event}', [EventController::class, 'show']);
        Route::post('events/{event}/scan', [EventController::class, 'scan']);
        Route::post('events/{event}/checkin', [EventController::class, 'checkin']);
        Route::post('events/{event}/checkout', [EventController::class, 'checkout']);

        // Event Sessions
        Route::get('events/{event}/sessions', [EventSessionController::class, 'index']);
        Route::get('events/{event}/sessions/search', [EventSessionController::class, 'searchSessions'])
            ->name('api.event.sessions.search');
        Route::get('events/{event}/sessions/{session}', [EventSessionController::class, 'show']);
        Route::post('events/{event}/sessions/{session}/scan', [EventSessionController::class, 'scan']);
        Route::post('events/{event}/sessions/{session}/checkin', [EventSessionController::class, 'checkin']);
        Route::post('events/{event}/sessions/{session}/checkout', [EventSessionController::class, 'checkout']);
        Route::get('events/{event}/sessions/{session}/attendance', [EventSessionController::class, 'attendance']);

        //Organizer Q&A  start
        Route::get('/events/organizer/qa/{session_id}', [QAController::class, 'organizerQA'])->name('api.events.qa.index');
        Route::get('/events/attendee/qa/{session_id}', [QAController::class, 'attendeeQA'])->name('api.events.qa.index');
        Route::post('/events/{session_id}/questions', [QAController::class, 'storeQuestion'])->name('api.events.qa.store');
        Route::post('/events/questions/{questionId}/vote', [QAController::class, 'vote'])->name('api.events.qa.vote');
        Route::post('/events/questions/{questionId}/answer', [QAController::class, 'storeAnswer'])->name('api.events.qa.answer');

        Route::prefix('events/qa')->group(function () {
            Route::put('/question/{questionId}', [QAController::class, 'updateQuestion'])->name('api.events.qa.updateQuestion');
            Route::delete('/question/{questionId}', [QAController::class, 'destroyQuestion'])->name('api.events.qa.destroyQuestion');
            Route::put('/answer/{answerId}', [QAController::class, 'updateAnswer'])->name('api.events.qa.updateAnswer');
            Route::delete('/answer/{answerId}', [QAController::class, 'destroyAnswer'])->name('api.events.qa.destroyAnswer');
        });
        //Q&A  End

        // Event Attendees
        Route::get('events/{event}/attendees', [AttendeeController::class, 'index']);
        Route::post('events/{event}/attendees', [AttendeeController::class, 'create']);
        Route::get('events/{event}/attendees/{attendee}', [AttendeeController::class, 'show']);
        Route::put('events/{event}/attendees/{attendee}', [AttendeeController::class, 'update']);

        // Event Tickets
        Route::get('events/{event}/tickets', [TicketController::class, 'index']);

        // Event Session Posts
        Route::get('/posts/{id}', [EventPostsController::class, 'getPosts'])->name('create.post');
        Route::post('/create-post', [EventPostsController::class, 'createPost'])->name('create.post');
        Route::delete('/delete-post/{id}', [EventPostsController::class, 'destroy'])->name('destroy');
        Route::get('/edit-post/{id}', [EventPostsController::class, 'editPost'])->name('post.edit');
        Route::post('/update-post/{id}', [EventPostsController::class, 'updatePost'])->name('post.update');

        // logout
        Route::post('/logout', [AuthController::class, 'logout']);
        // Event Organizer Assign Ticket Api Start
        Route::get('events/{event}/assign-tickets', [AssignTicketApiController::class, 'assignTickets'])->name('api.attendee.tickets.assign');
        Route::get('events/{event}/search-attendees', [AssignTicketApiController::class, 'searchAttendees'])
            ->name('api.attendee.tickets.search');
        Route::post('validate-discount-code/{disCode}', [AssignTicketApiController::class, 'validateDiscCode'])->name('api.validateCode.post');
        Route::post('checkout/{attendee}/{payment_method}', [AssignTicketApiController::class, 'checkout'])->name('api.tickets.checkout');
        Route::post('checkout-free/{attendee}/{payment_method}', [AssignTicketApiController::class, 'checkoutFreeTicket'])->name('api.tickets.checkout.free');
        Route::get('checkout/{paymentUuId}', [AssignTicketApiController::class, 'showCheckoutPage'])->name('api.tickets.checkout.page');
        Route::post('update-attendee-payment/{paymentUuId}', [AssignTicketApiController::class, 'updateAttendeePayment'])->name('api.update.payment');
        Route::get('payment-success/{paymentUuId}', [AssignTicketApiController::class, 'paymentSuccess'])->name('api.payment.success');
        // Event Organizer Assign Ticket Api End

        // Payments
        Route::get('events/{event}/payments', [OrganizerPaymentController::class, 'index']);
    });
});

Route::prefix('attendee')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->defaults('type', 'attendee');
    Route::post('register/{eventId}', [RegisterController::class, 'register']);
    Route::get('allevents', [AttendeeEventController::class, 'allevents']);
    Route::middleware(['auth:sanctum', 'ability:role:attendee'])->group(function () {

        Route::get('/me', function (Request $request) {
            return $request->user();
        });
        Route::post('profile/update/{attendee}', [ProfileController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('event/{eventApp}', [AttendeeEventController::class, 'getEventDetailDashboard']);
        Route::get('event/{eventApp}/session', [AttendeeEventController::class, 'getEventDetailAgenda']);
        Route::get('event/{eventApp}/session/{eventSession}', [AttendeeEventController::class, 'eventsessions']);
        Route::get('event/ticket/{eventApp}', [AttendeeEventController::class, 'ticket']);
        Route::get('event/speaker/{eventApp}', [AttendeeEventController::class, 'speaker']);
        Route::get('event/contact/{eventApp}', [AttendeeEventController::class, 'contact']);


        Route::post('checkout', [PaymentController::class, 'checkout'])->name('attendee.tickets.checkout');
        Route::post('checkout-free-ticket', [PaymentController::class, 'checkoutFreeTicket'])->name('attendee.tickets.checkout.free');
        Route::post('update-attendee-payment/{paymentUuId}', [PaymentController::class, 'updateAttendeePaymnet'])->name('attendee.update.payment');

        Route::get('payment/cancel', [PaymentController::class, 'paymentCancel'])->name('attendee.payment.cancel');
        Route::post('validate-discount-code', [PaymentController::class, 'validateDiscCode'])->name('attendee.validateCode.post');
        Route::get('payment-success/{paymentUuId}', [PaymentController::class, 'paymentSuccess'])->name('attendee.payment.success');

        // //PayPal
        // Route::post('/paypal/create-order', [PaymentController::class, 'createPayPalOrder'])->name('attendee.paypal.create-order');
        // Route::post('/paypal/capture-order', [PaymentController::class, 'capturePayPalOrder'])->name('attendee.paypal.capture-order');

        //purchased tickets
        Route::get('purchased-tickets', [PaymentController::class, 'attendeeTickets']);

        //Question Answer
        Route::get('/events/qa/{session_id}', [AttendeeQuestionAttendeeController::class, 'index'])->name('attendee.api.qa.index');
        Route::post('/events/{session_id}/questions', [AttendeeQuestionAttendeeController::class, 'storeQuestion'])->name('attendee.api.qa.store');
        Route::post('/events/questions/{questionId}/vote', [AttendeeQuestionAttendeeController::class, 'vote'])->name('attendee.api.qa.vote');
        Route::post('/events/questions/{questionId}/answer', [AttendeeQuestionAttendeeController::class, 'storeAnswer'])->name('attendee.api.qa.answer');
        Route::group(['prefix' => 'events/qa', 'as' => 'attendee.events.qa.'], function () {
            Route::put('/question/{questionId}', [AttendeeQuestionAttendeeController::class, 'updateQuestion'])->name('updateQuestion');
            Route::delete('/question/{questionId}', [AttendeeQuestionAttendeeController::class, 'destroyQuestion'])->name('destroyQuestion');
            Route::put('/answer/{answerId}', [AttendeeQuestionAttendeeController::class, 'updateAnswer'])->name('updateAnswer');
            Route::delete('/answer/{answerId}', [AttendeeQuestionAttendeeController::class, 'destroyAnswer'])->name('destroyAnswer');
        });

        //post
        Route::get('/event-posts/{id}', [EventPostController::class, 'getPostsMore'])->name('attendee.posts.index');
        Route::post('/attendee-poll-rating', [EventPostController::class, 'pollToggle'])->name('attendee.poll.rating');
        Route::post('/attendee-post-likes', [EventPostController::class, 'toggleLike'])->name('attendee.like.rating');
        Route::post('/attendee-post-dislikes', [EventPostController::class, 'toggleDislike'])->name('attendee.dislike.rating');
        Route::get('/session/{eventSession}/ratings', [AttendeeEventController::class, 'getSessionRatings'])
            ->name('attendee.session.ratings');
        Route::post('/attendee-save-rating/{eventSession}', [AttendeeEventController::class, 'saveRating'])->name('attendee.save.rating');
    });
});
