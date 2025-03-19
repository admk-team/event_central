<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
<<<<<<< HEAD
use Inertia\Inertia;

=======


use Inertia\Inertia;
>>>>>>> 8189945155616fb79d1c5803c82a9a8122cdbc3c

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get("/apps-ecommerce-orders", [ProfileController::class, 'index'])->name('order-list');
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit'); // To be removed in future
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-qr', function () {
    return QrCode::format('png')->size(256)->generate('https://google.com');
});

require __DIR__.'/auth.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/organizer.php';

require __DIR__ . '/theme.php';

require __DIR__ . '/attendee.php';
