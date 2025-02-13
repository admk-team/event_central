<?php

use App\Http\Controllers\Admin\ColorSchemeController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('color/scheme', ColorSchemeController::class);
});