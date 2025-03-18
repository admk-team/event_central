<?php

use App\Http\Controllers\Admin\ColorSchemeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrganizerController;
use App\Http\Controllers\Admin\PlatFormController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EventCategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'panel:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Users
    Route::resource('users', UserController::class);
    Route::delete('users/delete/many', [UserController::class, 'destroyMany'])->name('users.destroy.many');

    // Roles
    Route::resource('roles', RoleController::class);

    // Color themes
    Route::resource('color-themes', ColorSchemeController::class);
    Route::delete('color-themes/delete/many', [ColorSchemeController::class, 'destroyMany'])->name('color-themes.destroy.many');

    // Organizers
    Route::resource('organizers', OrganizerController::class);
    Route::delete('organizers/delete/many', [OrganizerController::class, 'destroyMany'])->name('organizers.destroy.many');

    // platform route
    Route::resource('platforms', PlatFormController::class);
    Route::delete('platforms/delete/many', [PlatFormController::class, 'destroyMany'])->name('platforms.destroy.many');

    // Event Catergory Routs
    Route::resource('event-category', EventCategoryController::class);
    Route::delete('evnet-category/delete/many', [EventCategoryController::class, 'destroyMany'])->name('event.category.destroy.many');
});
