<?php

use App\Http\Controllers\Attendee\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Attendee\Auth\RegisteredUserController;
use App\Http\Controllers\Attendee\EventController;
use App\Http\Controllers\Attendee\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/eventee/{id}', [EventController::class, 'getEventDetail'])->name('attendee.event');

Route::get('/eventee/{eventApp}/auth/login', [AuthenticatedSessionController::class, 'create'])->name('attendee.login');
Route::post('/eventee/{eventApp}/auth/login', [AuthenticatedSessionController::class, 'store'])->name('attendee.login.store');
Route::post('/eventee/{eventApp}/logout', [AuthenticatedSessionController::class, 'destroy'])->name('attendee.logout');

Route::get('/eventee/{eventApp}/auth/register', [RegisteredUserController::class, 'create'])->name('attendee.register');
Route::post('/eventee/{eventApp}/auth/register', [RegisteredUserController::class, 'store'])->name('attendee.register.store');
// http://127.0.0.1:8000/google-login/callback
Route::get('/google-login/redirect', [AuthenticatedSessionController::class, 'googleRedirect'])->name('attendee.google.redirect');
Route::get('/google-login/callback', [AuthenticatedSessionController::class, 'googleCallback'])->name('attendee.google.callback');

Route::middleware(['auth:attendee'])->group(function () {
    Route::get('/eventee/profile-edit', [ProfileController::class, 'edit'])->name('attendee.profile.edit');
    Route::get('/eventee/{eventApp}/detail/dashboard', [EventController::class, 'getEventDetailDashboard'])->name('attendee.event.detail.dashboard');
    Route::get('/eventee/{eventApp}/detail/agenda', [EventController::class, 'getEventDetailAgenda'])->name('attendee.event.detail.agenda');
    Route::get('/eventee/{eventApp}/detail/session/{eventSession}', [EventController::class, 'getEventSessionDetail'])->name('attendee.event.detail.session');
});
