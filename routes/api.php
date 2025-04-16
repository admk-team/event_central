<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\Attendee\ProfileController;
use App\Http\Controllers\Api\v1\Attendee\RegisterController;
use App\Http\Controllers\Api\v1\Attendee\EventController as AttendeeEventController;
use App\Http\Controllers\Api\v1\Organizer\EventController;
use App\Http\Controllers\Api\v1\Organizer\EventSessionController;
use App\Http\Controllers\Api\v1\Attendee\PaymentController;
use App\Http\Controllers\Api\v1\Attendee\QuestionAttendeeController as AttendeeQuestionAttendeeController;
use App\Http\Controllers\Api\v1\Organizer\AttendeeController;

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

        // Events
        Route::get('events', [EventController::class, 'index']);
        Route::get('events/{event}', [EventController::class, 'show']);
        Route::post('events/{event}/scan', [EventController::class, 'scan']);
        Route::post('events/{event}/checkin', [EventController::class, 'checkin']);
        Route::post('events/{event}/checkout', [EventController::class, 'checkout']);

        // Event Sessions
        Route::get('events/{event}/sessions', [EventSessionController::class, 'index']);
        Route::get('events/{event}/sessions/{session}', [EventSessionController::class, 'show']);
        Route::post('events/{event}/sessions/{session}/scan', [EventSessionController::class, 'scan']);
        Route::post('events/{event}/sessions/{session}/checkin', [EventSessionController::class, 'checkin']);
        Route::post('events/{event}/sessions/{session}/checkout', [EventSessionController::class, 'checkout']);

        // Event Attendees
        Route::get('events/{event}/attendees', [AttendeeController::class, 'index']);
        Route::get('events/{event}/attendees/{attendee}', [AttendeeController::class, 'show']);

        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::prefix('attendee')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->defaults('type', 'attendee');
    Route::post('register/{eventId}', [RegisterController::class, 'register']);
    Route::middleware(['auth:sanctum', 'ability:role:attendee'])->group(function () {

        Route::get('/me', function (Request $request) {
            return $request->user();
        });
        Route::post('profile/update/{attendee}', [ProfileController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('event/{eventApp}', [AttendeeEventController::class, 'getEventDetailDashboard']);
        Route::get('event/{eventApp}/session/{eventSession}', [AttendeeEventController::class, 'eventsessions']);
        // Route::get('event/{eventApp}/session', [AttendeeEventController::class, 'eventsessions']);
        Route::get('event/ticket/{eventApp}', [AttendeeEventController::class, 'ticket']);
        Route::get('event/speaker/{eventApp}', [AttendeeEventController::class, 'speaker']);
        Route::get('event/contact/{eventApp}', [AttendeeEventController::class, 'contact']);


        Route::post('checkout', [PaymentController::class, 'checkout'])->name('attendee.tickets.checkout');
        Route::post('checkout-free-ticket', [PaymentController::class, 'checkoutFreeTicket'])->name('attendee.tickets.checkout.free');
        Route::post('update-attendee-payment/{paymentUuId}', [PaymentController::class, 'updateAttendeePaymnet'])->name('attendee.update.payment');

        Route::get('payment/cancel', [PaymentController::class, 'paymentCancel'])->name('attendee.payment.cancel');
        Route::post('validate-discount-code/{disCode}', [PaymentController::class, 'validateDiscCode'])->name('attendee.validateCode.post');
        Route::get('payment-success/{paymentUuId}', [PaymentController::class, 'paymentSuccess'])->name('attendee.payment.success');

        // //PayPal
        // Route::post('/paypal/create-order', [PaymentController::class, 'createPayPalOrder'])->name('attendee.paypal.create-order');
        // Route::post('/paypal/capture-order', [PaymentController::class, 'capturePayPalOrder'])->name('attendee.paypal.capture-order');

        //purchased tickets
        Route::get('purchased-tickets', [PaymentController::class, 'attendeeTickets']);

        //Question Answer
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
    });
});
