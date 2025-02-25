<?php

use App\Http\Controllers\Attendee\EventController;
use App\Http\Controllers\Attendee\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/eventee/{id}', [EventController::class, 'getEventDetail'])->name('attendee.event');
Route::get('/eventee/{id}/auth/login', [EventController::class, 'attendeeLogin'])->name('attendee.login');
Route::get('/eventee/{id}/auth/register', [EventController::class, 'attendeeRegister'])->name('attendee.register');

Route::middleware(['auth'], function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('attendee.profile.edit');
});
