<?php

use App\Http\Controllers\Admin\ColorSchemeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::delete('users/delete/many', [UserController::class, 'destroyMany'])->name('users.destroy.many');
    Route::resource('roles', RoleController::class);
    Route::resource('color-themes', ColorSchemeController::class);
    Route::delete('color-themes/delete/many', [ColorSchemeController::class, 'destroyMany'])->name('color-themes.destroy.many');
});
