<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\Attendee\ProfileController;
use App\Http\Controllers\Api\v1\Attendee\RegisterController;
use App\Http\Controllers\Api\v1\Attendee\EventController as AttendeeEventController;
use App\Http\Controllers\Api\v1\Organizer\EventController;
use App\Http\Controllers\Api\v1\Organizer\EventSessionController;

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

        Route::get('events', [EventController::class, 'index']);
        Route::get('events/{event}', [EventController::class, 'show']);
        Route::get('events/{event}/sessions', [EventSessionController::class, 'index']);
        Route::get('events/{event}/sessions/{session}', [EventSessionController::class, 'show']);

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
    });
});
